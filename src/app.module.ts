import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIGURATION } from './configuration/configuration.keys';
import { DatabaseModule } from './configuration/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
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
    AppModule.PORT = this.configService.get(CONFIGURATION.PORT);
    AppModule.APP_NAME = this.configService.get<string>(CONFIGURATION.APP_NAME);
  }
}
