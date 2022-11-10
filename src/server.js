const cluster = require('cluster');
const {resolve} = require("path");

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
    const Token = require('./database/models/tokens')
    const createToken = require('./modules/createToken');
    const Email = require('./modules/email');
    const express = require('express');
    const multer  = require('multer');
    const cookieParser = require('cookie-parser')
    const ip = require("./modules/getIp");
    const upload = multer({ dest: 'uploads/' });
    const app = express();
    let config = {
        "host":"smtp.gmail.com", 
        "port":"587", 
        "secure":false, 
        "auth":{ 
                "type":"login", 
                "user":"matriculas@colegiolosangelestunja.com", 
                "pass":"zofczrflfjlsgyfq"
        }
    }
    const sender = new Email(config)
    // let request = 0
    app.use(express.json());
    app.use(cookieParser('qnapcloud'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(resolve('src/public')));


    app.get('/', (req, res, next)=> {
        res.clearCookie('sesskey', {path: '/'})
        res.sendFile(resolve('src/public/index.html'));
    });

    app.post('/get-token', upload.none(), async (req, res, next)=> {
        // if(request > 100) {
        //     res.json({repeat: true});
        //     return
        // }
        // request += 1;
        let student = await Students.findOne({"identification.id": req.body.studentId});
        if (student) {
            let message = await createToken(student, req.body.relativeId, Token, sender);
            res.json(message);
            // request -= 1
        } 
        else {
            res.json({refused: true});
            // request -= 1
        }
    })
    app.post('/signin', (req, res)=> {
        
    })
    app.listen(8080, ()=> {
        if(!ip) return console.log(`Server on http://localhost:8080 -> ${process.pid}`);
        console.log(`Server on http://${ip}:8080 -> ${process.pid}`);
    })
}
