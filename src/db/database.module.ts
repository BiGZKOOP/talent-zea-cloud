import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const username = configService.get('MONGO_USERNAME');
    const password = configService.get('MONGO_PASSWORD');
    const database = configService.get('MONGO_DATABASE');
    const host = configService.get('MONGO_HOST');

    return {
      uri: `mongodb://${username}:${password}@${host}`,
      dbName: database,
    };
  },
  inject: [ConfigService],
});
export class DatabaseModule {}
