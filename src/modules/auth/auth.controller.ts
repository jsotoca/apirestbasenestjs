import { AuthService } from './auth.service';
import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import SignInDTO from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('avatar'))
    async signUp(
        @Body() signUpDTO:SignUpDTO,
        @UploadedFile() avatar:any
    ){
        const image = (avatar)?avatar:null;
        return await this.authService.signUp(signUpDTO,image);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(
        @Body() signInDTO:SignInDTO,
    ){
        return await this.authService.signIn(signInDTO);
    }

    @Post('/forgotpassword')
    @UsePipes(ValidationPipe)
    async forgotPassword(
        @Body('email') email:string,
    ){
        return await this.authService.forgotPassword(email);
    }

}
