const db = require('mongoose')
const {Schema} = db

const parent = new Schema({
    name:{type: String, required: true},
    lastname:{type: String, required: true},
    identificationCard:{type: Number, required: true},
    name:{type: String, required: true},
    email:{type: String, required: true},
    token:{}
})