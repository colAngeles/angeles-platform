require('../database/connect')
const Token = require('../database/models/tokens')
const { exec } = require('child_process')
const { resolve } = require('path')
process.on('message', (message) => {
  let data = message.split(' ')
  if (data[0] == 'START') {
    exec(`echo '${data[1]};${data[3]}' | python3 ${resolve('src/modules.py/sendmessage.py')}`, (error, stdout, stderr) => {
      if (error) {
        process.send(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        process.send(`stderr: ${stderr}`);
        return;
      }
      
      if(stdout == "error:email") {
        process.send(stdout)
        return
      }

      !async function save() {
        console.log(data, data[2])
        console.log("Starting save")
        let parent = await Token.findByIdAndUpdate({"parentid": "1057"}, {$set: {token: stdout}}, {upsert: true})
        console.log("This is a test from save -> parent", parent)
        process.send('successful');
      }()
        
    })
  }
})