import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SignInDTO from '../auth/dto/signin.dto';
import SignUpDTO from '../auth/dto/signup.dto';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository
    ){}

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user = await this.userRepository.signUp(signUpDTO,avatar);
        return user;
    }

    async signIn(signInDTO:SignInDTO){
        const user = await this.userRepository.signIn(signInDTO);
        return user;
    }

    async getUser(email:string){
        const user = await this.userRepository.findOne({email});
        return user;
    }
}
