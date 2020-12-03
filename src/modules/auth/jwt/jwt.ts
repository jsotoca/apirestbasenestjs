import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { sign,verify } from 'jsonwebtoken';
import User from "src/modules/user/user.entity";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export default class JWTHelpers {
    constructor(
        private readonly jwtService:JwtService
    ){}
    
    generateToken(payload:JwtPayload){
        return this.jwtService.sign(payload);
    }
    
    generateResetToken(user:User){
        const {id,password,created_at} = user;
        const secret = id+"-"+password+"-"+created_at;
        const token = sign({id},secret,{expiresIn:'1h'});
        return token;
    }
    
    decodedResetToken(user:User,token:string){
        const {id,password,created_at} = user;
        const secret = id+"-"+password+"-"+created_at;
        return verify(token,secret);
    }
}


