const ip = require("./modules/getIp")
const express = require('express')
const app = express()



app.listen(8080, ()=> {
    console.log(`Server on http://${ip}:8080`)
})