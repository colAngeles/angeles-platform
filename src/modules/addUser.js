let Student = require('../database/models/student')

module.exports = async function (data){
    let student = {
        name: data.name, 
        surname: data.surname,
        grade: data.grade,
        identification: {
            id: data.identification, 
            type: data.identificationtype
        },
        annualAmountText: data.annualAmountText,
        annualAmount: data.annualAmount,
        enrollmentAmountText: data.enrollmentAmountText,
        enrollmentAmount: data.enrollmentAmount,
        remainingAmountText: data.remainingAmountText,
        remainingAmount: data.remainingAmount,
        pensionText: data.pensionText,
        pension: data.pension,
        
        parents: {
            mother: {
                name: data.mothername,
                surname: data.mothersurname,
                identification: {
                    type: data.motheridentificationtype,
                    id: data.motheridentification
                },
                location: {
                    address: data.motheraddress,
                    city: data.mothercity,
    
                },
                email: data.motheremail,
                phone: data.motherphone
            },
            father: {
                name: data.fathername,
                surname: data.fathersurname,
                identification: {
                    type: data.fatheridentificationtype,
                    id: data.fatheridentification
                },
                location: {
                    address: data.fatheraddress,
                    city: data.fathercity,
    
                },
                email: data.fatheremail,
                phone: data.fatherphone
            }
        },
        relative: {
            name: data.relativename,
            surname: data.relativesurname,
            identification: {
                type: data.relativeidentificationtype,
                id: data.relativeidentification
            },
            location: {
                address: data.relativeaddress,
                city: data.relativecity,

            },
            email: data.relativeemail,
            phone: data.relativephone
        }
    }
    if (data.anotherAmount) {
        student.anotherAmountText = data.anotherAmountText;
        student.anotherAmount = data.anotherAmount;
    }
    return await Student.create([student])
}