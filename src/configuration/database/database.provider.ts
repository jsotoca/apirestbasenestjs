import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { Configuration } from '../configuration.keys';
import { ConnectionOptions } from 'typeorm';

export const databaseProvider = TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async(config:ConfigService)=>({
        type:'mysql',
        url:config.get<string>(Configuration.DATABASE_URI),
        entities:[__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize:true
    } as ConnectionOptions)
});