const db = require('mongoose')
const { Schema } = db

const token = new Schema({
    parentIdentification: {type: String, required: true},
    token: {type: String, required: true}
})
module.exports = db.model('tokens', token)