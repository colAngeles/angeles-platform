const generateRandomString = require('./generateRandomString')
async function createToken(student, relativeId, Token, sender) {
    const token = generateRandomString(6)
    let relationship = student.parents.mother.identification.id == relativeId ? 'mother'
        : student.parents.father.identification.id == relativeId ? 'father'
        : student.relative.identification.id == relativeId ? 'relative': null;
    let person = relationship == 'mother' ? student.parents.mother : relationship == 'father' ? student.parents.father : student.relative;
    let email = {
        from: "matriculas@colegiolosangelestunja.com",
        to: person.email,
        subject: "Token de validación - Matriculas 2022",
        html: `
            <div> 
                <p>¡Cordial saludo señor(a) ${person.name}!</p>

                <p>Queremos confirmarle los datos que le permitirán acceder a la plataforma de matriculas.</p>

                <p>NOTA: Este Token de validación sólo tendrá vigencia de una hora, desde el momento que recibio éste correo. Despues de éste tiempo tendrá que volver a generarlo.</p>

                <p><b>Token:</b> <b style="color: #f7901e; font-family: Arial, Helvetica, sans-serif;"> ${token} </b></p>
                
                <p><a href="www.avcla.com">Matriculas 2023 - Colegio Los Ángeles</a></p>
                
                <p style="text-align: justify;">Si tiene algún problema a la hora de acceder a la plataforma, puede escribir al correo duvanmotavita@colegiolosangelestunja.com o al número de <a style="color: #f7901e;" href="wa.me//+573228317980">WhatsApp</a></p>
                
                <p>Cordialmente,</p> 
                <br/>
                Duván Motavita Pérez
                <br/>
                Software Developer, Colegio Los Ángeles.
            </div> 
        ` 
    }
    let conf = await sender.sendMail(email);
    // console.log("Email was send successfully");
    if(conf) {
        try {
            let dbToken = await Token.findOneAndUpdate({studentid: student.identification.id}, {$set: {createdAt: new Date(), token, person: person, student}}, {upsert: true});
            if (dbToken) {
                // console.log("Token saved successfully")
                return {successful: true};
            }
        }
        catch (error) {
            // console.log("Token saved trow error")
            return {error: "database"};
        }
    }
    // console.log("The email was not send")
    return {emailerror: "error:email"};
}

module.exports = createToken


