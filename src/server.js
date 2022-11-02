require('./database/connect')
const Parents = require('./database/models/parent')
let { fork } = require('child_process')
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
    
})
app.post('/token', upload.none(), async (req, res, next)=> {
    console.log(req.body)
    let parent = await Parents.findOne({"identification": req.body.parentId})
    console.log("Test", parent)
    if(parent){
        console.log("Within is stament")
        const child = fork(resolve('src/modules/sendEmail'));
        child.on('message', (message) => {
            console.log('Returning /total results');
            console.log(message)
            res.json({conf: message}) 
        });
        child.send(`START ${parent.name} ${parent.identification} ${parent.email}`);
        return
    } 
    res.json({refused: true})
    
})
app.listen(8080, ()=> {
    console.log(`Server on http://${ip}:8080`)
})