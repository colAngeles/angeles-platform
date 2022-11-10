require('./database/connect')
const Students = require('./database/models/student')
const { cpus } = require('os')
let numCPUs = cpus().length;
const { fork } = require('child_process')
const {resolve} = require("path")
const express = require('express')
const multer  = require('multer')
const ip = require("./modules/getIp")
const upload = multer({ dest: 'uploads/' })
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(resolve('src/public')))


app.get('/', (req, res, next)=> {
    res.sendFile(resolve('src/public/index.html'))
})

app.post('/get-token', upload.none(), async (req, res, next)=> {
    let student = await Students.findOne({"identification.id": req.body.studentId})
    if (student) {
        if(childs >= numCPUs) return res.json({repeat: true})
        const controller = new AbortController();
        const { signal } = controller;
        const child = fork(resolve('src/modules/createToken'), [childs], {signal});
        child.send({start: true, student, relativeId: req.body.relativeId});
        child.on('message', (message) => {
            res.json(message)
            child.kill()
            childs -= 1
        })
        childs += 1
    } 
    else {
        res.json({refused: true})
    }
    
})
app.post('/login', (req, res)=> {
    
})
app.listen(8080, ()=> {
    if(!ip) return console.log(`Server on http://localhost:8080`)
    console.log(`Server on http://${ip}:8080`)
})
