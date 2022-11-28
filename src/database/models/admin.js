const db = require("mongoose");
const { Schema } = db;

const admin = new Schema({
    user: {type: String, required: true},
    pass: {type: String, required: true}
})

module.exports = db.model('admins', admin);