const db = require('mongoose');
const { Schema } = db;
const increment = new Schema({name: String, num: Number});
module.exports = db.model("increments", increment);