import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Configuration } from '../../../configuration/configuration.keys';

export const JwtProvider = JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async(config:ConfigService)=>({
        secret:config.get<string>(Configuration.TOKEN_SECRET),
        signOptions:{
            expiresIn:'7d'
        }
    })
});