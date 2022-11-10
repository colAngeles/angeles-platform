const db = require('mongoose')
const { Schema } = db

const token = new Schema({
    createdAt: Date,
    studentid: {type: String, required: true},
    token: {type: String, required: true},
    relationship: String
})
module.exports = db.model('tokens', token)