const generateRandomString = require('./generateRandomString');
const Token = require('../database/models/tokens');
async function createToken(student, relativeId, sender) {
    const token = generateRandomString(6);
    let relationship = student.parents.mother.identification.id == relativeId ? 'mother'
        : student.parents.father.identification.id == relativeId ? 'father'
        : student.relative.identification.id == relativeId ? 'relative': null;
    let person = relationship == 'mother' ? student.parents.mother : relationship == 'father' ? student.parents.father : student.relative;
    let email = {
        from: '"Matriculas - Colegio Los Ángles" <no-reply@colegiolosangelestunja.com>',
        to: person.email,
        subject: "Token de validación - Matriculas 2022",
        html: `
            <div> 
                <p>¡Cordial saludo ${person.name}!</p>

                <p>Queremos confirmarle los datos que le permitirán acceder a la plataforma de matriculas.</p>

                <p>NOTA: Este Token de validación sólo tendrá vigencia de una hora, desde el momento de la recepción de éste correo. Despues de éste tiempo tendrá que volver a generarlo.</p>

                <p><b>Token:</b> <b style="color: #f7901e; font-family: Arial, Helvetica, sans-serif;"> ${token} </b></p>
                
                <p><a href="www.avcla.com">Matriculas 2023 - Colegio Los Ángeles</a></p>
                
                <p style="text-align: justify;">Si tiene algún problema a la hora de acceder a la plataforma, puede escribir al correo admin@colegiolosangelestunja.com o al número de <a style="color: #f7901e;" href="wa.me//+573228317980">WhatsApp</a></p>
                
                <p>Cordialmente,</p> 
                <br/>
                Duván Motavita Pérez
                <br/>
                Software Developer, Colegio Los Ángeles.
            </div> 
        ` 
    }
    try {
        await Token.findOneAndUpdate({studentid: student.identification.id}, {$set: {createdAt: new Date(), token, person, student}}, {upsert: true});
        try {
            await sender.sendMail(email);
            return {successful: true};
        }
        catch (e) {
            return {emailerror: "error:email"};
        }
    }
    catch (error) {
        console.log("Catch error");
        return {error: "database"};
    }
}
module.exports = createToken;


