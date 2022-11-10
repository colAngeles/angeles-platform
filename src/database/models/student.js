const db = require("mongoose")
const { Schema } = db
const student = new Schema({
    name: {type: String, required: true}, 
    surname: {type: String, required: true},
    gender: String,
    grade: String,
    address: String,
    identification: {
        id: {type: String, required: true},
        type: {type: String, required: true}
    },
    parents: {
        mother: {
            name: String,
            surname: String,
            identification: {
                type: {type: String},
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
                type: {type: String},
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
            id: {type: String, required: true},
            type: {type: String},
        },
        location: {
            address: String,
            city: String
        },
        email: {type: String, required: true},
        phone: String,
        relationship: String
    }
    
})

module.exports = db.model("students", student)

// !async function(){
//     await Student.create([{
//         name: "Duván", 
//         surname: "Motavita Pérez", 
//         identification: {
//             id: "1057186692", 
//             type: "C.C."
//         },
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
//                 surname: "Mptavita",
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
//                 address: "Yopal",
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


