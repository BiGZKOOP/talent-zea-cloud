import { Module } from '@nestjs/common';
import { SubServiceService } from './sub-service.service';
import { SubServiceController } from './sub-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubService, SubServiceSchema } from './entities/sub-service.schema';
import { FileServiceModule } from '../file-service/file-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubService.name, schema: SubServiceSchema },
    ]),
    FileServiceModule,
  ],
  controllers: [SubServiceController],
  providers: [SubServiceService],
  exports: [SubServiceService]
})
export class SubServiceModule {}
