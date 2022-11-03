require('../database/connect')
const Token = require('../database/models/tokens')
const { exec } = require('child_process')
const { resolve } = require('path')
process.on('message', (message, app) => {
  console.log("Incomming message")
  console.log(message)
  // if (message.start) {
  //   exec(`echo ${message.name} ${message.email} | python ${resolve('src/modules.py/sendmessage.py')}`, (error, stdout, stderr) => {
  //     if (error) {
  //       res.json({error: error});
  //       return;
  //     }

  //     if (stderr) {
  //       res.json({stderr: stderr});
  //       return;
  //     }
      
  //     if(stdout == "error:email") {
  //       res.json({erroremail: stdout})
  //       return
  //     }

  //     !async function save() {
  //       try {
  //         let parent = await Token.findOneAndUpdate({parentid: message.identification}, {$set: {token: stdout}}, {upsert: true})
  //         if(parent) {
  //           res.json({conf: true});
  //           return
  //         }
  //         res.json({refused: true})
  //       }
  //       catch(error) {
  //         res.json({error: "database"})
  //       }
        
  //     }()
        
  //   })
  // }
})