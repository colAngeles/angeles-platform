declare const createTransport: any;
interface UserAccount {
    user: string;
    pass: string;
}
declare class Email {
    size: number;
    initConfig: {
        pool: boolean;
        host: string;
        port: string;
        secure: boolean;
        auth: {
            type: string;
            user: string;
            pass: string;
        };
    };
    transporter: any;
    config: UserAccount[];
    changed: boolean;
    constructor(config: UserAccount[]);
    sendMail(email: any): Promise<any>;
}
