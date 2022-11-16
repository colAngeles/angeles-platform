const db = require('mongoose')
const { Schema } = db

const token = new Schema({
    createdAt: Date,
    studentid: {type: String, required: true},
    token: {type: String, required: true},
    person: Object,
    student: Object
})
module.exports = db.model('tokens', token)