const { RssFeed } = require('@mui/icons-material')
const {resolve}  = require('path')
const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    res.sendFile(resolve('src/public/index.html'))
})