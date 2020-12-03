import { JwtProvider } from './jwt/jwt.provider';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JWTHelpers from './jwt/jwt';

@Module({
  imports: [
    UserModule,
    JwtProvider,
  ],
  controllers: [AuthController],
  providers: [AuthService,JWTHelpers]
})
export class AuthModule {}
