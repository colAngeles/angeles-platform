// require('../database/connect')
// const Token = require('../database/models/tokens')
const Email = require('./email')                                                                      
let config = {
    "host":"smtp.gmail.com", 
    "port":"587", 
    "secure":false, 
    "auth":{ 
            "type":"login", 
            "user":"matriculas@colegiolosangelestunja.com", 
            "pass":"zofczrflfjlsgyfq"
    }
}
process.on('message', async ({start, student, relativeId}) => {
  console.log(process.ppid)
  const sender = new Email(config)
  if(start) {
    let relationship = student.parents.mother.identification.id == relativeId ? 'mother'
        : student.parents.father.identification.id == relativeId ? 'father'
        : student.relative.identification.id == relativeId ? 'relative': null
    let person = relationship == 'mother' ? student.parents.mother : relationship == 'father' ? student.parents.father : student.relative

    let email = { 
        from:"matriculas@colegiolosangelestunja.com",  //remitente
        to:"duvanmotavita@colegiolosangelestunja.com",  //destinatario
        subject:"Token de validación - Matriculas 2022",  //asunto del correo
        html:` 
            <div> 
                <p>¡Cordial saludo señor(a) ${person.name}!</p>
    
                <p>Queremos confirmarle los datos que le permitirán acceder a la plataforma de matriculas.</p>
                
                <p><b>Token:</b> <b style="color: #f7901e;">{token}</b></p>
                
                <p><a href="www.avcla.com">Aula Virtual Colegio Los Ángeles</a></p>
                
                <p style="text-align: justify;">Si tiene algún problema a la hora de acceder a la plataforma, puede escribir al correo duvanmotavita@colegiolosangelestunja.com o al número de <a style="color: #f7901e;" href="wa.me//+573228317980">WhatsApp</a></p>
                
                <p>Cordialmente,</p> 
                <br/>
                Duván Motavita Pérez
                <br/>
                Software Developer, Colegio Los Ángeles.
            </div> 
        ` 
    };
    let conf = await sender.sendMail(email)
    if(conf) {
        try {
            let token = await Token.findOneAndUpdate({studentid: student.identification.id}, {$set: {createdAt: new Date(), token: 'stdout', relationship: relationship}}, {upsert: true})
            if (token) {
                process.send({successful: true});
                return
            }
        }
        catch (error) {
            process.send({error: "database"})
            return
        }
    }
    return process.send({emailerror: "error:email"})

    // exec(`echo ${person.name} ${person.email} | python ${resolve('src/modules.py/sendmessage.py')}`, (error, stdout, stderr) => {
    //   if (error) {
    //     process.send({error: error});
    //   }
    //   else if (stderr) {
    //     process.send({stderr: stderr});
    //   }
      
    //   else if (stdout == "error:email") {
    //     process.send({emailerror: stdout});
    //   }

    //   !async function save() {
    //     try {
    //       let token = await Token.findOneAndUpdate({studentid: student.identification.id}, {$set: {createdAt: new Date(), token: stdout, relationship: relationship}}, {upsert: true})
    //       if (token) {
    //         process.send({successful: true});
    //       }
    //     }
    //     catch (error) {
    //       process.send({error: "database"})
    //     }
    //   }()
        
    // })
  }
})