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
const createWorkbook = require('./modules/createWorkbook');
const express = require('express');
const multer  = require('multer');
const cookieParser = require('cookie-parser');
const ip = require("./modules/getIp");
const upload = multer({ dest: 'src/dashboarduploads/' });
const app = express();
let initConfig = [
    {
        user: "noreply@colegiolosangelestunja.com",
        pass: "xezhnrnokmmebfst"
    },
    {
        user: "no.reply@colegiolosangelestunja.com",
        pass: "htslqnfeypumdwsq"
    },
    {
        user: "no-reply@colegiolosangelestunja.com",
        pass: "xreidpdzedgpijgu"
    },
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
    },
]
const sender = new Email(initConfig)

app.set('view engine', 'ejs');
app.set('views', resolve('src/public')) // specify the views directory
app.use(express.json());
app.use(cookieParser('qnapcloud'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve('src/public')));
app.get('/', (req, res) => {
    res.render('index', {name: 'adminlog'});
});
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

app.get(/\/dashboard\/?(:path)?/, (req, res) => {
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
})
app.get('/preactive-users', async (req, res) => {
    let { limit, page } = req.query;
    if (req.signedCookies.sesskey) {
        let result = await Students.paginate({active: false, preActive: true}, {limit, page});
        res.json(result);
    }
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
app.get('/download-active-users-csv', async (req, res) => {
    if (req.signedCookies.sesskey) { 
        let data = await Students.find({active: true, preActive: true});
        if (data) {
            let file = fs.createWriteStream(resolve('src/dashboarduploads/active_users.csv'))
            file.write(`grado;apellido;nombre;tipo identificacion;identificacion;apellidos padre;nombres padre;tipo identificacion padre;identificacion padre;direccion padre;telefono padre;email padre;ciudad residencia padre;apellidos madre;nombres madre;tipo identificacion madre;identificacion madre;direccion madre;telefono madre;email madre;ciudad residencia madre;apellidos acudiente;nombres acudiente;tipo identificacion acudiente;identificacion acudiente;direccion acudiente;telefono acudiente;email acudiente;ciudad residencia acudiente;valor anual;valor anual texto;valor matricula;texto valor matricula;valor total pension;texto valor total pension;pension;texto pension;otros costos;texto otros costos;;;;\n`);
            data.forEach((value) => { 
            file.write(`${value.grade};${value.surname};${value.name};${value.identification.type};${value.identification.id};${value.parents.father.surname || ''};${value.parents.father.name || ''};${value.parents.father.identification.type || ''};${value.parents.father.id || ''};${value.parents.father.location.address || ''};${value.parents.father.phone || ''};${value.parents.father.email || ''};${value.parents.father.location.city || ''};${value.parents.mother.surname || ''};${value.parents.mother.name || ''};${value.parents.mother.identification.type || ''};${value.parents.mother.id || ''};${value.parents.mother.location.address || ''};${value.parents.mother.phone || ''};${value.parents.mother.email || ''};${value.parents.mother.location.city || ''};${value.relative.surname || ''};${value.relative.name || ''};${value.relative.identification.type || ''};${value.relative.id || ''};${value.relative.location.address || ''};${value.relative.phone || ''};${value.relative.email || ''};${value.relative.location.city || ''};${value.annualAmount || ''};${value.annualAmountText || ''};${value.enrollmentAmount || ''};${value.enrollmentAmountText || ''};${value.remainingAmount || ''};${value.remainingAmountText || ''};${value.pension || ''};${value.pensionText || ''};${value.annualAmount ? value.anotherAmount : ''};${value.anotherAmountText ? value.anotherAmountText : ''};;;;\n`);
            })
            file.end()
            res.download(resolve('src/dashboarduploads/active_users.csv'));
        }
    }
})
app.get('/download-active-users-excel', async (req, res) => {
    if (req.signedCookies.sesskey) { 
        let data = await Students.find({active: true, preActive: true});
        if (data) {
            createWorkbook('UsuariosActivos', data, res);
            return
        }
        res.status(404).send();
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
    if(!ip) return console.log(`Server on http://localhost:4000`);
    console.log(`Server on http://${ip}:4000-> ${process.pid}`);
})

let io = new Server(httpServer);
io.on('connection', (socket) => {
    socket.on('upload', ({ fileName }) => {
        uploadusers(socket, fileName);
    })
})


