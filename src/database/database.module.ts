import { Module, Global } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"


import { ConfigType } from "@nestjs/config"

import config from "../config"


const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';



@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, cluster, dbName} = configService.mongodb;
        
        

        return {
          uri: `${connection}://${user}:${password}@${cluster}/${dbName}`
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY', MongooseModule],
})
export class DatabaseModule {}
