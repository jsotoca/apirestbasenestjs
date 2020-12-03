import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';
import JwtHelpers from './jwt/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtHelpers:JwtHelpers
    ){}

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user = await this.userService.signUp(signUpDTO);
        const token = this.jwtHelpers.generateToken({id:user.id});
        return {token,user}
    }
}
