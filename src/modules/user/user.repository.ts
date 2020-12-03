import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import SignUpDTO from "../auth/dto/signup.dto";
import User from "./user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    async signUp(signUpDTO:SignUpDTO,avatar?:string){
        const { fullname, email, password } = signUpDTO;
        const user = new User();
        user.fullname = fullname.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        user.email = email;
        user.password = password;
        if(avatar) user.avatar = avatar;
        try {
            await user.save();
            return user;
        } catch (error) {
            if(error.errno === 1062) throw new ConflictException('Email ya registrado.');
            else throw new InternalServerErrorException('Error con el servidor al momento de registrar.');
        }
    }
}