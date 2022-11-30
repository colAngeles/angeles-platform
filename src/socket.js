require('./database/connect');
const { Server } = require('socket.io');
const { resolve } = require("path");
const deleteFile = require('./modules/deleteFile');
const fs = require('fs');
let bcrypt = require('bcryptjs');
const Email = require('./dist/email');
const Students = require('./database/models/student');
const addUser = require('./modules/addUser');
const Admin = require('./database/models/admin');
const updateStatus = require('./modules/updateStatus');
const uploadusers = require('./modules/uploadusers');
const express = require('express');
const multer  = require('multer');
const cookieParser = require('cookie-parser');
const ip = require("./modules/getIp");
const upload = multer({ dest: 'src/dashboarduploads/' });
const app = express();
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

app.set('view engine', 'ejs');
app.set('views', resolve('src/public')) // specify the views directory
app.use(express.json());
app.use(cookieParser('qnapcloud'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve('src/public')));

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
        let [amountUsers, activeUsers, preActiveUser] = await Promise.all([Students.find({}).count(), Students.find({$where: 'this.active == true && this.preActive == false'}).count(), Students.find({$where: 'this.active == false && this.preActive == true'}).count()]) 
        res.json({amountUsers, activeUsers, preActiveUser});
        return
    }
})
app.get('/active-users', async (req, res) => {
    let { limit, page } = req.query;
    if (req.signedCookies.sesskey) {
        let result = await Students.paginate({active: true, preActive: true}, {limit, page});
        res.json(result);
    }
    // req.query.id
})
app.get('/preactive-users', async (req, res) => {
    let { limit, page } = req.query;
    if (req.signedCookies.sesskey) {
        let result = await Students.paginate({active: false, preActive: true}, {limit, page});
        res.json(result);
    }
    // req.query.id
})
app.get('/inactive-users', async (req, res) => {
    let { limit, page } = req.query;
    if (req.signedCookies.sesskey) {
        let result = await Students.paginate({active: false, preActive: false}, {limit, page});
        res.json(result);
    }
})
app.get('/users', async (req, res) => {
    let { limit, page } = req.query;
    if (req.signedCookies.sesskey) {
        let result = await Students.paginate({}, {limit, page});
        res.json(result);
    }
})
app.get('/get-audio', (req, res) => {
    if (req.signedCookies.sesskey) {
        res.sendFile(resolve(`src/uploads/${req.query.name}`))
    }
})
app.get('/download-file', (req, res) => {
    if (req.signedCookies.sesskey) {
        res.sendFile(resolve(`src/uploads/${req.query.filename}`));
    }
})
app.get('/download-active-users', async () => {
        let data = await Students.find({active: true, preActive: true});
        if (data) {
            let file = fs.createWriteStream(resolve('src/dashboarduploads/active_users.csv'))
            file.write(``)
        }
})
app.post('/approve', upload.none(), async (req, res) => {
    if (req.signedCookies.sesskey) {
        let person = JSON.parse(req.body.person);
        let files = JSON.parse(req.body.files);
        let identification = req.body.identification;
        let conf = await updateStatus({person, files, identification, success: true}, sender);
        res.json(conf);
    }
})
app.post('/disapprove', upload.none(), async (req, res) => {
    let person = JSON.parse(req.body.person);
    let files = JSON.parse(req.body.files);
    let identification = req.body.identification;
    let conf = await updateStatus({person, files, identification, success: false}, sender);
    if (conf.success) {
        let [result1, result2, result3] = await Promise.all([deleteFile(resolve(`src/uploads/${files.contract}`)), deleteFile(resolve(`src/uploads/${files.promissorynote}`)), deleteFile(resolve(`src/uploads/${files.audio}`))]);
        if (result1 && result2 && result3) {
            res.json({success: true});
            return
        }
        res.json({success: true});
        return
    }
    if (conf.sendmail) {
        let [result1, result2, result3] = await Promise.all([deleteFile(resolve(`src/uploads/${files.contract}`)), deleteFile(resolve(`src/uploads/${files.promissorynote}`)), deleteFile(resolve(`src/uploads/${files.audio}`))]);
        if (result1 && result2 && result3) {
            res.json({sendmail: true});
            return
        }
        res.json({sendmail: true});
        return
    }
    res.json(conf);
})

// Errors handle
app.all('*', (_, res) => {
    res.status(404).render('internalerror', {title: "Error 404", info: "Lo sentimos, la página que estás buscando no se encuentra disponible."});
})

app.all('/error-handler', (req, res) => {
    res.status(500).render('internalerror', {title: 'Error 500', info: 'Nuestras más sinceras disculpas, se ha producido un error al tratar de guardar los documentos. Por favor, inténtelo más tarde.'});
})

app.use((err, _, res, next) => {
    res.clearCookie('sesskey', {path: '/'});
    if(err) {
        res.status(500).render('internalerror', {title: 'Error 500', info: 'Nuestras más sinceras disculpas, se ha producido un error inesperado. Por favor, inténtelo más tarde.'});
    }
})

let httpServer = app.listen(4000, ()=> {
    if(!ip) return console.log(`Server on http://localhost:3000 -> ${process.pid}`);
    console.log(`Server on http://${ip}:3000 -> ${process.pid}`);
})

let io = new Server(httpServer);
io.on('connection', (socket) => {
    socket.on('upload', ({ fileName }) => {
        uploadusers(socket, fileName);
    })
})


