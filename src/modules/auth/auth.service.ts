import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService
    ){}

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user = await this.userService.signUp(signUpDTO);
        return {
            token:'123456',
            user
        }
    }
}
