import { Module } from '@nestjs/common';
import { RequiredPageService } from './required-page.service';
import { RequiredPageController } from './required-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RequiredPageEntity,
  RequiredPageSchema,
} from './entities/required-page.schema';
import { SubServiceModule } from '../sub-service/sub-service.module';
import { SubServiceService } from '../sub-service/sub-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RequiredPageEntity.name,
        schema: RequiredPageSchema,
      },
    ]),
    SubServiceModule,
  ],
  controllers: [RequiredPageController],
  providers: [RequiredPageService],
  exports: [RequiredPageService],
})
export class RequiredPageModule {}
