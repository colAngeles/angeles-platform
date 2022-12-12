const Students = require('../database/models/student');
const { resolve } = require('path');
async function updateStatus({person, files, student, success},  sender) {
    if (success) {
        let approve = {
            from: '"Matriculas - Colegio Los Ángles" <no-reply@colegiolosangelestunja.com>',
            to: person.email,
            subject: "Actualización de Estado - Matriculas 2022",
            html: `
                <div>
                    <p>Actualización de estado para el (la) estudiante <b>${student.name} ${student.surname}</b> con número de identificación <b>${student.id}</b>.</p>

                    <p>¡Cordial saludo ${person.name.split(' ')[0]} ${person.surname.split(' ')[0]}!</p>
    
                    <p>Queremos confirmarle que el proceso de la firma del contrato ha sido exitoso.</p>
                    <p>Ahora podrá continuar con la siguiente etapa consistente en la descarga del recibo para el pago en sucursales <a href="http://colegiolosangelestunja.com/colangeles/index.php?r=site/matricula">Bancolombia (dando clic aquí)</a>. También podrá efectuarlo  via <a href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=4075">PSE (dando clic aquí)</a>. En caso que ya haya hecho el pago, diríjase al último y tercer paso en <a href="https://edain.compucol.co/colegios/tunjacolegiolosangeles/">compucol (dando clic aquí)</a> </p>
    
                    <p><a href="www.matriculascolegiolosangelestunja.com">Matrículas ${new Date().getFullYear()} - Colegio Los Ángeles</a></p>

                    <p style="text-align: justify;">Si tiene alguna petición, puede escribirnos al correo <a style="color: #f7901e;" href="mailto:matriculas@colegiolosangelestunja.com">matriculas@colegiolosangelestunja.com</a></p>
                    
                </div> 
            ` ,
            attachments: [
                {
                    filename: `Contrato_${student.id}.pdf`,
                    path: resolve(`src/uploads/${files.contract}`),
                    cid: person.email
                }
            ]
        }
        try {
            let user = await Students.findOneAndUpdate({'identification.id': student.id, preActive: true}, {$set: {active: true}});
            if (user) {
                try {
                    await sender.sendMail(approve);
                    return {success: true};
                }
                catch (e) {
                    try {
                        let user = await Students.findOneAndUpdate({'identification.id': student.id, preActive: true}, {$set: {active: false}});
                        if (user) {
                            return {emailerror: true};
                        }
                        return {sendmail: true}
                    }
                    catch (e) {
                        return {sendmail: true}
                    }
                    
                }
            }
            return {usererror: true};
        }
        catch (error) {
            return {dberror: true};
        }
    }
    let disapprove = {
        from: '"Matriculas - Colegio Los Ángles" <no-reply@colegiolosangelestunja.com>',
        to: person.email,
        subject: "Actualización de Estado - Matriculas 2022 - ",
        html: `
            <div>
                <p>Actualización de estado para el (la) estudiante <b>${student.name} ${student.surname}</b> con número de identificación <b>${student.id}</b>.</p>
    
                <p>¡Cordial saludo ${person.name.split(' ')[0]} ${person.surname.split(' ')[0]}!</p>

                <p>Queremos informarle que los documentos diligenciados en la plataforma de matricula han sido revisados. Se han encontrado algunas inconsistencias, por ende, recomendamos volver a realizar el proceso siguiendo cada una de las intrucciones dadas.</p>

                <p><a href="www.matriculascolegiolosangelestunja.com">Matrículas ${new Date().getFullYear()} - Colegio Los Ángeles</a></p>
    
            </div> 
        ` 
    }
    try {
        let user = await Students.findOneAndUpdate({$where: `this.identification.id == ${student.id}`}, {$set: {preActive: false}});
        if (user) {
            try {
                await sender.sendMail(disapprove);
                return {success: true};
            }
            catch (e) {
                try {
                    let user = await Students.findOneAndUpdate({$where: `this.identification.id == ${student.id}`}, {$set: {preActive: true}});
                    if (user) {
                        return {emailerror: true};
                    }
                    return {sendmail: true};
                }
                catch (e) {
                    return {sendmail: true};
                }
            }
        }
        return {usererror: true};
    }
    catch (error) {
        return {dberror: true};
    }
    
}
module.exports = updateStatus;