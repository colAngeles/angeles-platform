const db = require('mongoose')
const url = "mongodb://angeles:muysuperior04@192.168.10.141:27017/enrollments?ssl=false&authSource=admin"

db.connect(url)
    .then(data => console.log('DB has been connected'))
    .catch(err => console.log('Error ', err))

module.exports = db