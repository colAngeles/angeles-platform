require('./connect')
const Admin = require('./models/admin')
let bcrypt = require('bcryptjs');

!async function(){
    let hash = await bcrypt.hash('Bibliotk2020.', 8)
    let user = await Admin.create([{user: 'admin', pass: hash}])
    console.log(user, "This is the user")
    let userdb = await Admin.findOne({user: 'angeles'});
    let hashdb = await bcrypt.compare('Bibliotk2020.', userdb.pass);
    console.log(hashdb)
}()