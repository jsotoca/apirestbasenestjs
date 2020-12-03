import { AuthService } from './auth.service';
import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @Post('/')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('avatar'))
    async signUp(
        @Body() signUpDTO:SignUpDTO,
        @UploadedFile() file:any
    ){
        return await this.authService.signUp(signUpDTO);
    }
}
