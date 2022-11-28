const Student = require('../database/models/student');
const parser = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
function uploadusers(socketIo, fileName) {
    let count = 1;
    let reader = fs.createReadStream(resolve(`src/dashboarduploads/${fileName}`));
    reader.pipe(parser({
        separator: ';',
        strict: true
    })).on('data', async (data) => {
        let studentData = {
            name: data['nombre'], 
            surname: data['apellido'],
            grade: data['grado'],
            identification: {
                id: data['identificacion'], 
                type: data['tipo identification']
            },
            annualAmountText: data['texto valor anual'],
            annualAmount: data['valor anual'],
            enrollmentAmountText: data['texto valor matricula'],
            enrollmentAmount: data['valor matricula'],
            remainingAmountText: data['texto valor total pension'],
            remainingAmount: data['valor total pension'],
            pensionText: data['texto pension'],
            pension: data['pension'],
            parents: {
                mother: {
                    name: data['nombres madre'],
                    surname: data['apellidos madre'],
                    identification: {
                        type: data['tipo identificacion madre'],
                        id: data['identificacion madre']
                    },
                    location: {
                        address: data['direccion madre'],
                        city: data['ciudad residencia madre'],
        
                    },
                    email: data['email madre'],
                    phone: data['telefono madre']
                },
                father: {
                    name: data['nombres padre'],
                    surname: data['apellidos padre'],
                    identification: {
                        type: data['tipo identificacion padre'],
                        id: data['identificacion padre']
                    },
                    location: {
                        address: data['direccion padre'],
                        city: data['ciudad residencia padre'],
        
                    },
                    email: data['email padre'],
                    phone: data['telefono padre']
                }
            },
            relative: {
                name: data['nombres acudiente'],
                surname: data['apellidos acudiente'],
                identification: {
                    type: data['tipo identificacion acudiente'],
                    id: data['identificacion acudiente']
                },
                location: {
                    address: data['direccion acudiente'],
                    city: data['ciudad residencia acudiente'],
    
                },
                email: data['email acudiente'],
                phone: data['telefono acudiente']
            }
        }
        if (data['otros costos']) {
            studentData.anotherAmountText = data['texto otros costos'];
            studentData.anotherAmount = data['otros costos'];
        }
        try {
            await Student.findOneAndUpdate({'identification.id': studentData.identification.id}, {$set: studentData}, {upsert: true});
            let conf = await Student.findOne({'identification.id': studentData.identification.id});
            if (conf) {
                socketIo.emit('user:loaded', {success: true, count});
                count++
                return
            }
            socketIo.emit('user:loaded', {success: true, count});
            count++
            return
        }
        catch (err) {
            socketIo.emit('user:loaded', {success: false});
            count++
        }
    }).on('end', () => {
        fs.unlink(resolve(`src/dashboarduploads/${fileName}`), async (e) => {
                    if (e) throw e
        })
    }) 
}
module.exports = uploadusers
