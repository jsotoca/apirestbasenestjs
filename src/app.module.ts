import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from './configuration/configuration.keys';
import { DatabaseModule } from './configuration/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    AuthModule,
    UserModule,
    ServicesModule,
  ],
  controllers: [
    
  ],
  providers: [

  ],
})
export class AppModule {
  static PORT: string | number;
  static APP_NAME: string;
  constructor(private configService:ConfigService){
    AppModule.PORT = this.configService.get(Configuration.PORT);
    AppModule.APP_NAME = this.configService.get<string>(Configuration.APP_NAME);
  }
}
