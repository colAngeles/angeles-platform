const Students = require('../database/models/student');
const { resolve } = require('path');
async function updateStatus({person, files, identification, success},  sender) {
    if (success) {
        let approve = {
            from: '"Matriculas - Colegio Los Ángles" <no-reply@colegiolosangelestunja.com>',
            to: person.email,
            subject: "Actualización de Estado - Matriculas 2022",
            html: `
                <div> 
                    <p>¡Cordial saludo ${person.name.split(' ')[0]} ${person.surname.split(' ')[0]}!</p>
    
                    <p>Queremos confirmarle que el proceso de la firma del contrato ha sido exitoso.</p>
                    <p>Ahora podrá continuar con la siguiente etapa consistente en la descarga del recibo para el pago en sucursales <a href="http://colegiolosangelestunja.com/colangeles/index.php?r=site/matricula">Bancolombia (dando clic aquí)</a>. También podrá efectuarlo  via <a href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=4075">PSE (dando clic aquí)</a>. En caso que ya haya hecho el pago, diríjase al último y tercer paso linkcompucol </p>
    
                    <p><a href="www.avcla.com">Matriculas ${new Date().getFullYear()} - Colegio Los Ángeles</a></p>

                    <p style="text-align: justify;">Si tiene alguna petición, puede escribirnos al correo <a style="color: #f7901e;" href="wa.me//+573228317980">admin@colegiolosangelestunja.com</a></p>
                    
                    <p>Cordialmente,</p> 
                    <br/>
                    Duván Motavita Pérez
                    <br/>
                    Software Developer, Colegio Los Ángeles.
                </div> 
            ` ,
            attachments: [
                {
                    filename: `Contrato_${identification}.pdf`,
                    path: resolve(`src/uploads/${files.contract}`),
                    cid: person.email
                }
            ]
        }
        try {
            let user = await Students.findOneAndUpdate({'identification.id': identification, preActive: true}, {$set: {active: true}});
            if (user) {
                try {
                    await sender.sendMail(approve);
                    return {success: true};
                }
                catch (e) {
                    try {
                        let user = await Students.findOneAndUpdate({'identification.id': identification, preActive: true}, {$set: {active: false}});
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
        subject: "Actalización de Estado - Matriculas 2022",
        html: `
            <div> 
                <p>¡Cordial saludo ${person.name.split(' ')[0]} ${person.surname.split(' ')[0]}!</p>

                <p>Queremos informarle que los documentos diligenciados en la plataforma de matricula han sido revisados. Se han encontrado algunas inconsistencias, por ende, recomendamos volver a realizar el proceso siguiendo cada una de las intrucciones dadas.</p>

                <p><a href="www.matriculascolegiolosangelestunja.com">Matriculas ${new Date().getFullYear()} - Colegio Los Ángeles</a></p>
                
                <p>Cordialmente,</p> 
                <br/>
                Duván Motavita Pérez
                <br/>
                Software Developer, Colegio Los Ángeles.
            </div> 
        ` 
    }
    try {
        let user = await Students.findOneAndUpdate({$where: `this.identification.id == ${identification}`}, {$set: {preActive: false}});
        if (user) {
            try {
                await sender.sendMail(disapprove);
                return {success: true};
            }
            catch (e) {
                try {
                    let user = await Students.findOneAndUpdate({$where: `this.identification.id == ${identification}`}, {$set: {preActive: true}});
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