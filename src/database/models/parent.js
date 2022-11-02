const db = require('mongoose')
const {Schema} = db

const parent = new Schema({
    name:{type: String, required: true},
    lastname:{type: String, required: true},
    identification:{type: Number, required: true},
    email:{type: String, required: true},
})
module.exports = db.model('parents', parent)