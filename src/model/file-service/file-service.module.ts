import { Module } from '@nestjs/common';
import { FileServiceService } from './file-service.service';
import { FileServiceController } from './file-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService, FileServiceSchema } from './entities/file-service.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileService.name, schema: FileServiceSchema },
    ]),
    ConfigModule,
  ],
  controllers: [FileServiceController],
  providers: [FileServiceService],
  exports: [FileServiceService],
})
export class FileServiceModule {}
