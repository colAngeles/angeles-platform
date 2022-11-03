require('./database/connect')
const Parents = require('./database/models/parent')
let { fork } = require('child_process')
const {resolve} = require("path")
const express = require('express')
const multer  = require('multer')
const ip = require("./modules/getIp")
const upload = multer({ dest: 'uploads/' })
const app = express()
const child = fork(resolve('src/modules/sendEmail'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(resolve('src/public')))

app.get('/', (req, res, next)=> {
    
})
let test = {
    test: "This is a test"
}
child.send("{start: true, name: parent.name, identification: parent.identification, email: parent.email}", app)

app.post('/token', upload.none(), async (req, res, next)=> {
    let parent = await Parents.findOne({"identification": req.body.parentId})
    console.log("This is a test")
    if(parent){
        // child.on('message', (message) => {
        //     res.json({conf: message}) 
        // });
        // child.send(`START ${parent.name} ${parent.identification} ${parent.email}`, );
        // return
        next()
        return
    } 
    res.json({refused: true})
    
})
app.listen(8080, ()=> {
    console.log(`Server on http://${ip}:8080`)
})