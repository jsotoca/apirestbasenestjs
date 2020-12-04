import { Module } from '@nestjs/common';
import { S3Service } from './s3/s3.service';
import { MailerProvider } from './nodemailer/mailer.provider';
import NodeMailerService from './nodemailer/nodemailer.service';

@Module({
  imports: [ MailerProvider ],
  providers: [ S3Service, NodeMailerService],
  exports: [S3Service,  MailerProvider, NodeMailerService]
})
export class ServicesModule {}
