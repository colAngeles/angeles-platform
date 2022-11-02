const db = require('mongoose')
const { Schema } = db

const token = new Schema({
    parentid: {type: String, required: true},
    token: {type: String, required: true}
})
module.exports = db.model('tokens', token)