
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from './../../configuration/configuration.keys';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export  const MailerProvider =  MailerModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async(config:ConfigService)=>({
        transport: config.get<string>(Configuration.SMTP_TRANSPORT),
        requireTLS: true,
        secure:true,
        defaults:{
            from: `"${config.get<string>(Configuration.APP_NAME)} Not Respond" <${config.get<string>(Configuration.APP_MAIL)}>`
        },
        template: {
          dir: './templates/email',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
    })
});