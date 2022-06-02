import { Module } from '@nestjs/common';
import { RequiredPageService } from './required-page.service';
import { RequiredPageController } from './required-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RequiredPageEntity,
  RequiredPageSchema,
} from './entities/required-page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RequiredPageEntity.name,
        schema: RequiredPageSchema,
      },
    ]),
  ],
  controllers: [RequiredPageController],
  providers: [RequiredPageService],
})
export class RequiredPageModule {}
