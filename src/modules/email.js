const {createTransport} = require('nodemailer')
class Email {

    constructor(config) {
        this.transporter = createTransport(config)
    }

    async sendMail(email) {
        // smtp.gmail.com
        //587
        try {
            let info = await this.transporter.sendMail(email)
            return info
        }
        catch(e) {
            console.log(e)
            return null
        }
    }
}
module.exports = Email