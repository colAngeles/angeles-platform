const { createTransport } = require('nodemailer')
interface UserAccount {
    user: string;
    pass: string;
}
class Email {
    size: number;
    initConfig: { pool: boolean; host: string; port: string; secure: boolean; auth: { type: string; user: string; pass: string; }; };
    transporter: any;
    config: UserAccount[];
    changed: boolean;
    constructor (config: UserAccount[]) {
        this.changed = false;
        this.size = config.length;
        this.config = config
        this.initConfig = {
                pool: true,
                host:"smtp.gmail.com", 
                port:"587",
                secure:false,
                auth: {
                    type: "login",
                    user: "",
                    pass: ""
            }
        };
        this.initConfig.auth.user = this.config[0].user
        this.initConfig.auth.pass = this.config[0].pass
        this.transporter = createTransport(this.initConfig);
    }
    async sendMail (email) {
        // smtp.gmail.com
        //587
        let count: number = 1;
        if (this.changed) {
            this.initConfig.auth.user = this.config[0].user
            this.initConfig.auth.pass = this.config[0].pass
            this.transporter = createTransport(this.initConfig);
            this.changed = false;
        }

        while(true){
            try {
                let info = await this.transporter.sendMail(email)
                return info
            }
            catch(e) {
                if (count >= this.size) throw e
                this.transporter.close()
                this.initConfig.auth.user = this.config[count].user
                this.initConfig.auth.pass = this.config[count].pass
                this.transporter = createTransport(this.initConfig);
                this.changed = true;
                count += 1
                continue
            }
        }
       
    }
}
module.exports = Email