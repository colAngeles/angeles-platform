const ip = require("./modules/getIp")
const path = require("path")
const express = require('express')
const app = express()

app.use(express.static(path.resolve('src/public')))

app.get('/', (req, res)=> {
    res.sendFile(resolve('src/public/index.html'))
})
app.listen(8080, ()=> {
    console.log(`Server on http://${ip}:8080`)
})