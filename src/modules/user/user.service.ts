import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SignUpDTO from '../auth/dto/signup.dto';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository
    ){}

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user = await this.userRepository.signUp(signUpDTO);
        return user;
    }
}
