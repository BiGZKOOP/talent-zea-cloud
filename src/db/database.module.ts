import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        return {
          uri: `mongodb+srv://${username}:${password}@talentzea.baq33.mongodb.net/${database}?retryWrites=true&w=majority`,
          dbName: database,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
