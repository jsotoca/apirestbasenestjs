import { S3Service } from './../../services/s3/s3.service';
import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';
import JwtHelpers from './jwt/jwt';
import NodeMailerService from 'src/services/nodemailer/nodemailer.service';
import SignInDTO from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtHelpers:JwtHelpers,
        private readonly S3:S3Service,
        private readonly nodeMailerService:NodeMailerService
    ){}

    async signUp(signUpDTO:SignUpDTO,image?:any){
        let avatar = null;
        if(image){
            const { Location } = await this.S3.uploadImage(image,'avatars');
            avatar = Location;
        } 
        const user = await this.userService.signUp(signUpDTO,avatar);
        const token = this.jwtHelpers.generateToken({id:user.id});
        this.nodeMailerService.sendMailRegister(user.email,user.fullname);
        return {token,user}
    }

    async signIn(signInDTO:SignInDTO){
        const user = await this.userService.signIn(signInDTO);
        const token = this.jwtHelpers.generateToken({id:user.id});
        return {token,user}
    }

    async forgotPassword(email:string){
        const user = await this.userService.getUser(email);
        if(!user)throw new NotFoundException('email no encontrado en la base de datos.');
        const token = this.jwtHelpers.generateResetToken(user);
        await this.nodeMailerService.sendMailResetPassword(user.fullname,user.email,token);
        return {ok:true,message:'email enviado'};
    }
}
