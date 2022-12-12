const db = require('mongoose');
// const url = "mongodb://localhost/enrollments"
db.connect(url)
    .then(data => console.log('DB has been connected'))
    .catch(err => console.log('Error: ', err))

module.exports = db
