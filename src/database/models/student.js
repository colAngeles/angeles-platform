// require('../connect')
const db = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = db
const student = new Schema({
    active: {type: Boolean, default: false},
    preActive: {type: Boolean, default: false},
    pathFiles: {
        contract: {type: String, trim: true},
        promissorynote: {type: String, trim: true},
        audio: {type: String, trim: true},
    },
    signedAt: String,
    name: {type: String, required: true},
    surname: {type: String, required: true},
    gender: String,
    grade: String,
    address: String,
    annualAmountText: String,
    annualAmount: String,
    enrollmentAmountText: String,
    enrollmentAmount: String,
    remainingAmountText: String,
    remainingAmount: String,
    pensionText: String,
    pension: String,
    anotherAmountText: String,
    anotherAmount: String,
    identification: {
        id: {type: String, required: true, trim: true},
        type: {type: String, required: true}
    },
    parents: {
        mother: {
            name: String,
            surname: String,
            identification: {
                type: {type: String, trim: true},
                id: String,
            },
            location: {
                address: String,
                city: String
            },
            email: String,
            phone: String,
        },
        father: {
            name: String,
            surname: String,
            identification: {
                type: {type: String, trim: true},
                id: String,
            },
            location: {
                address: String,
                city: String
            },
            email: String,
            phone: String,
        },
    },
    relative: {
        name: String,
        surname: String,
        identification: {
            id: {type: String, required: true, trim: true},
            type: {type: String},
        },
        location: {
            address: String,
            city: String
        },
        email: {type: String, required: true},
        phone: String,
        relationship: String
    },
    person: String

})
student.plugin(mongoosePaginate);
module.exports = db.model("students", student);


// const Stundent = db.model("students", student);

// !async function() {
//     let userSize = await Stundent.find({})
//     console.log(userSize.length, "This is a test");
// }()

// !async function(){
//     await Student.create([{
//         name: "Duván", 
//         surname: "Motavita Pérez",
//         grade: "PRIMERO",
//         identification: {
//             id: "1057186692", 
//             type: "C.C."
//         },
//         annualAmountText: "QUICE MILLONES DE PESOS",
//         anotherAmount: "15,000,000",
//         enrollmentAmountText:"UN MILLON DE PESOS",
//         enrollmentAmount: "1,000,000",
//         remainingAmountText: "CINCO MILLONES",
//         remainingAmount: "5,000,000",
//         pensionText: "QUIENTOS MIL PESOS",
//         pension: "500,000",
//         anotherAmountText: "UN MILLON DE PESOS",
//         anotherAmount: "1,000,000",
//         parents: {
//             mother: {
//                 name: "Maria Elvira",
//                 surname: "Pérez Lopez",
//                 identification: {
//                     type: "C.C.",
//                     id: "24070616"
//                 },
//                 location: {
//                     address: "Ciudad Jardin",
//                     city: "Tunja",
    
//                 },
//                 email: "unknown",
//                 phone: "3226092247"
//             },
//             father: {
//                 name: "Jose",
//                 surname: "Motavita",
//                 identification: {
//                     type: "C.C.",
//                     id: "54464654"
//                 },
//                 location: {
//                     address: "Ciudad Jardin",
//                     city: "Tunja",
//                 },
//                 email: "None",
//                 phone: "unknown"
//             }
//         },
//         relative: {
//             name: "Carolina",
//             surname: "Motavita Pérez",
//             identification: {
//                 type: "C.C",
//                 id: "1057186308",
//             },
//             location: {
//                 address: "CALLE 55 # 10-12. PRADOS DEL NORTE",
//                 city: "Yopal"
//             },
//             email: "duvanmotavita@colegiolosangelestunja.com",
//             phone: "3183550645",
//             relationship: "Sister"
//         }
//     }])
//     console.log("This is a test")
//     let result = await Student.find({$where: 'this.name == "Duván" || this.name == "Daniel"'})
//     console.log(result)
// }()


