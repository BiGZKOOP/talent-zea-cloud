import { Module } from '@nestjs/common';
import { SubServiceService } from './sub-service.service';
import { SubServiceController } from './sub-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubServiceImage,
  SubServiceImageSchema,
} from './entities/sub-service-image.schema';
import { SubService, SubServiceSchema } from './entities/sub-service.schema';
import { FileServiceModule } from '../file-service/file-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubServiceImage.name, schema: SubServiceImageSchema },
      { name: SubService.name, schema: SubServiceSchema },
    ]),
    FileServiceModule,
  ],
  controllers: [SubServiceController],
  providers: [SubServiceService],
})
export class SubServiceModule {}
