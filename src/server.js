const cluster = require('cluster');

if(cluster.isMaster){
    const { cpus } = require('os');
    let numCPUs = cpus().length;
    console.log(`Primary ${process.pid} is running`);
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
    const Students = require('./database/models/student');
    const Token = require('./database/models/tokens');
    const { resolve } = require("path");
    const createToken = require('./modules/createToken');
    const Email = require('./dist/email');
    const express = require('express');
    const multer  = require('multer');
    const cookieParser = require('cookie-parser');
    const ip = require("./modules/getIp");
    const upload = multer({ dest: 'src/public/uploads/' });
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
    app.use(express.json());
    app.use(cookieParser('zofczrflfjlsgyfq'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(resolve('src/public')));


    app.get('/', (req, res, next)=> {
        res.clearCookie('sesskey', {path: '/'})
        res.sendFile(resolve('src/public/index.html'));
    });

    app.post('/get-token', upload.none(), async (req, res, next)=> {
        let student = await Students.findOne({$where: `this.identification.id == ${req.body.studentId} && (this.parents.mother.identification.id == ${req.body.relativeId} || this.parents.father.identification.id == ${req.body.relativeId} || this.relative.identification.id == ${req.body.relativeId})`});
        if (student) {
            let message = await createToken(student, req.body.relativeId, Token, sender);
            res.json(message);
        } 
        else {
            res.json({refused: true});
        }
    })

    app.post('/validate-token', upload.none(), async (req, res)=> {
        const token = await Token.findOne({"studentid": req.body.studentId.trim(), token: req.body.token.trim()});
        if (token) {
            res.cookie('token', token.token, {expires: new Date(Date.now() + 8 * 3600), signed: true});
            res.json(token);
            return
        }
        res.json({refused: true});
        
    })

    app.get('/signin', (req, res)=> {
        if(req.cookies.token == req.query.token){
            res.sendFile(resolve('src/public/contract.html'))
            return
        }
        res.redirect('/')
    })
    const cpUpload = upload.fields([{ name: 'contract', maxCount: 1 }, { name: 'audio', maxCount: 1 }])
        app.post('/save-data', cpUpload, (req, res) => {
        console.log(req.body);
        console.log(req.file);
        res.json({successful: true})
    })
    app.listen(8080, ()=> {
        if(!ip) return console.log(`Server on http://localhost:8080 -> ${process.pid}`);
        console.log(`Server on http://${ip}:8080 -> ${process.pid}`);
    })
}
