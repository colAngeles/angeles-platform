require('../database/connect')
const Parents = require('../database/models/parent')
const { exec } = require('child_process')
const { resolve } = require('path')
process.on('message', (message) => {
  let data = message.split(' ')
  if (data[0] == 'START') {
    exec(`echo '${data[1]};${data[2]}' | python ${resolve('src/modules.py/sendmessage.py')}`, (error, stdout, stderr) => {
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
        let parent = Parents.findByIdAndUpdate()
        console.log(`stdout:\n${stdout}`);
        process.send(stdout);
      }()
        
    })
  }
})