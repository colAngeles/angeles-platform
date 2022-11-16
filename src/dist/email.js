var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { createTransport } = require('nodemailer');
class Email {
    constructor(config) {
        this.changed = false;
        this.size = config.length;
        this.config = config;
        this.initConfig = {
            pool: true,
            host: "smtp.gmail.com",
            port: "587",
            secure: false,
            auth: {
                type: "login",
                user: "",
                pass: ""
            }
        };
        this.initConfig.auth.user = this.config[0].user;
        this.initConfig.auth.pass = this.config[0].pass;
        this.transporter = createTransport(this.initConfig);
    }
    sendMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // smtp.gmail.com
            //587
            let count = 1;
            if (this.changed) {
                this.initConfig.auth.user = this.config[0].user;
                this.initConfig.auth.pass = this.config[0].pass;
                this.transporter = createTransport(this.initConfig);
                this.changed = false;
            }
            while (true) {
                try {
                    let info = yield this.transporter.sendMail(email);
                    return info;
                }
                catch (e) {
                    if (count >= this.size)
                        throw e;
                    this.transporter.close();
                    this.initConfig.auth.user = this.config[count].user;
                    this.initConfig.auth.pass = this.config[count].pass;
                    this.transporter = createTransport(this.initConfig);
                    this.changed = true;
                    count += 1;
                    continue;
                }
            }
        });
    }
}
module.exports = Email;
