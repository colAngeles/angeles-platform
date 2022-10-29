const db = require('mongoose')
const url = "mongodb://localhost/enrollmens"

db.connect(url)
    .then(data => console.log('Connected Db'))
    .catch(err => console.log('Error ', e))

module.exports = db