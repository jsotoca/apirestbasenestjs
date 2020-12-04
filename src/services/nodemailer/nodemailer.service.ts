import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailer } from './mailer.interface';
import { Configuration } from 'src/configuration/configuration.keys';

@Injectable()
export default class NodeMailerService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ){}

    async sendMail(dataMail:IMailer){
        return new Promise<Boolean>(async (resolve,reject)=>{
            let { to, from, subject, template, context } = dataMail;
            context['app_name'] = this.configService.get<string>(Configuration.APP_NAME);
            context['app_mail'] = this.configService.get<string>(Configuration.APP_MAIL);
            await this.mailerService.sendMail({
                to,
                from,
                subject,
                template,
                context
            })
            .then(
                ()=>resolve(true)
            )
            .catch(
                ()=>reject(false)
            );
        });
    }

    async sendMailRegister(email,fullname){
        const dataMail: IMailer = {
            to: email,
            from: `"${this.configService.get<string>(Configuration.APP_NAME)} Not Respond" <${this.configService.get<string>(Configuration.APP_MAIL)}>`,
            subject: `Welcome to ${this.configService.get<string>(Configuration.APP_NAME)} 🚀!`,
            template: 'register',
            context: {
                user: fullname
            },
        };
        return await this.sendMail(dataMail);
    }

    async sendMailResetPassword(fullname:string,email:string,token:string){
        const url = `https://www.yourappname.com/resetpassword?email=${email}&token=${token}`;
        const dataMail:IMailer = {
            to: email,
            from: `"${this.configService.get<string>(Configuration.APP_NAME)} Not Respond" <${this.configService.get<string>(Configuration.APP_MAIL)}>`,
            subject: `Reset your password in ${this.configService.get<string>(Configuration.APP_NAME)} 🚀!`,
            template: 'resetpassword',
            context: {
                user:fullname,
                url
            },
        };
        return await this.sendMail(dataMail);
    }
}
