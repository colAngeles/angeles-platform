const cluster = require('cluster');
let bcrypt = require('bcryptjs');
const http = require('http');
const { Server: SocketServer } = require('socket.io');
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");
const Students = require('./database/models/student');
const addUser = require('./modules/addUser');7
const uploadusers = require('./modules/uploadusers')
const Token = require('./database/models/tokens');
const Admin = require('./database/models/admin');
const Increment = require('./database/models/increment');
const { resolve } = require("path");
const createToken = require('./modules/createToken');
const Email = require('./dist/email');
const express = require('express');
const multer  = require('multer');

if (cluster.isMaster) {
    const { cpus } = require('os');
    let numCPUs = cpus().length;
    console.log(`Primary ${process.pid} is running`);
    const httpServer = http.createServer();

    // setup sticky sessions
    setupMaster(httpServer, {
        loadBalancingMethod: "least-connection",
    });

    // setup connections between the workers
    setupPrimary();

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

}
else {
    require('./database/connect');
    const cookieParser = require('cookie-parser');
    const ip = require("./modules/getIp");
    const upload = multer({ dest: 'src/uploads/' });
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', resolve('src/public')) // specify the views directory
    let initConfig = [
        {
            user: "matriculas@colegiolosangelestunja.com",
            pass: "zofczrflfjlsgyfq"
        },
        {
            user: "duvanmotavita@colegiolosangelestunja.com",
            pass: "nepdrwmneaqcjwhs"
        },
        {
            user: "angelesmoodle@gmail.com",
            pass: "ygjpwmulsxtskkzi"
        }
    ]
    const sender = new Email(initConfig)
    app.use(express.json());
    app.use(cookieParser('qnapcloud'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(resolve('src/public')));

    app.get('/', (req, res, next) => {
        res.clearCookie('test', {path: '/', signed: true})
        res.sendFile(resolve('src/public/index.html'));
    });

    app.post('/get-token', upload.none(), async (req, res, next)=> {
        // Students.findOne(
        //     {$where: `this.active == false && this.preActive == false && this.identification.id == ${req.body.studentId} && (this.parents.mother.identification.id == ${req.body.relativeId} || this.parents.father.identification.id == ${req.body.relativeId} || this.relative.identification.id == ${req.body.relativeId})`
        // })
        Students.findOne(
            {$where: `this.identification.id == ${req.body.studentId} && (this.parents.mother.identification.id == ${req.body.relativeId} || this.parents.father.identification.id == ${req.body.relativeId} || this.relative.identification.id == ${req.body.relativeId})`
        })
        .then(data => {
            if (data) {
                return createToken(data, req.body.relativeId, sender);
            }
            return {refused: true};
        })
        .then( data => {
            res.json(data);
        })
        .catch( err => {
            console.log(err)
            res.json({error: "database"});
        });
    })

    app.post('/validate-token', upload.none(), async (req, res)=> {
        try {
            let [token, increment] = await Promise.all([Token.findOne({"studentid": req.body.studentId, token: req.body.token.trim()}), Increment.findOneAndUpdate({name: "main"}, {$inc: {num: 1}})]);
            if (token && increment) {
                res.cookie('token', token.token, {expires: new Date(Date.now() + 2 * 3600000), signed: true});
                res.json({token, number: increment.num});
                return
            }
            res.json({refused: true});
        }
        catch ( err ) {
            res.json({error: "database"});
        }
    })

    app.get('/signin', (req, res)=> {
        if(req.signedCookies.token === req.query.id){
            res.clearCookie('name', { path: '/' })
            res.sendFile(resolve('src/public/contract.html'));
            return
        }
        res.redirect(301, '/');
    })
    
    const cpUpload = upload.fields([{ name: 'contract', maxCount: 1 }, {name: 'promissorynote', maxCount: 1},{ name: 'audio', maxCount: 1 }]);
    app.post('/save-data', cpUpload, async (req, res) => {
        let {signedAt, studentid, token, person} = req.body;
        let pathFiles = {
                        contract: req.files['contract'][0].filename,
                        promissorynote: req.files['promissorynote'][0].filename,
                        audio: req.files['audio'][0].filename
            }
        if (req.signedCookies.token == token) {
            const student = await Students.findOneAndUpdate({'identification.id': studentid}, {$set: {signedAt, preActive: true, pathFiles, person}})
            if (student) {
                res.status(200).send('ok');
                return
            }
            res.status(500).send('error');
        }
            
        res.redirect('/');
    })

    app.get('/success', (req, res) => {
        if (req.signedCookies.token) {
            res.clearCookie('token', {path: '/'});
            res.status(200).sendFile(resolve('src/public/success.html'));
            return
        }
        res.redirect('/');
    })

    //Admin Section

    app.get('/admin-login', (req, res) => {
        res.clearCookie('sesskey', {path: '/'});
        res.sendFile(resolve('src/public/admin.html'));
    });
    app.post('/admin', upload.none(), async (req, res) => {
        const { user, pass } = req.body;
        const userdb = await Admin.findOne({user});
        if ( userdb ) {
            let hash = await bcrypt.compare(pass, userdb.pass);
            if ( hash ) {
                res.cookie('sesskey', user, { expires: new Date(Date.now() + 8 * 3600000), signed: true});
                res.status(200).json({conf: true});
                return
            }
            res.status(403).json({refused: true});
            return
        }
        res.status(403).json({refused: true})
    })
    app.get('/dashboard', (req, res) => {
        if (req.signedCookies.sesskey) {
            res.sendFile(resolve('src/public/dashboard.html'));
            return
        }
        res.redirect('/admin-login');
    });

    app.put('/add-user', upload.none(), async (req, res) => {
        if (req.signedCookies.sesskey) {
            try {
                let user = await addUser(req.body);
                if (user) {
                    res.json({success: true});
                    return
                }
                res.json({error: "database"});
            }
            catch (err) {
                res.json({error: "database"});
            }
        }
    })
    app.put('/upload-users', upload.single('csvfile'), (req, res) => {
        if (req.signedCookies.sesskey) { 
            res.json({fileName: req.file.filename});
            return
        }
    })
    app.get('/data-home', async (req, res) => {
        if (req.signedCookies.sesskey) {
            let amountUsers = await Students.find({}).count();
            res.json({data: true});
            return
        }
    })


    // Errors handle
    app.all('*', (_, res) => {
        res.status(404).render('internalerror', {title: "Error 404", info: "Lo sentimos, la página que estás buscando no se encuentra disponible."});
    })

    app.all('/error-handler', (req, res) => {
        res.status(500).render('internalerror', {title: 'Error 500', info: 'Nuestras más sinceras disculpas, se ha producido un error al tratar de guardar los documentos. Por favor, inténtelo más tarde.'});
    })

    app.use((err, _, res, next) => {
        res.clearCookie('token', {path: '/'});
        if(err) {
            res.status(500).render('internalerror', {title: 'Error 500', info: 'Nuestras más sinceras disculpas, se ha producido un error inesperado. Por favor, inténtelo más tarde.'});
        }
    })

    let httpServer = app.listen(8080, ()=> {
        if(!ip) return console.log(`Server on http://localhost:8080 -> ${process.pid}`);
        console.log(`Server on http://${ip}:8080 -> ${process.pid}`);
    })

    let io = new SocketServer(httpServer);
    io.adapter(createAdapter());
    setupWorker(io);
    io.on('connection', (socket) => {
        socket.on('upload', ({ fileName }) => {
            uploadusers(socket, fileName);
        })
    })

    
}
