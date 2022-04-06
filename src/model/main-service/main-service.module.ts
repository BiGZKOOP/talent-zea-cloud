import { Module } from '@nestjs/common';
import { MainServiceService } from './main-service.service';
import { MainServiceController } from './main-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MainService, MainServiceSchema } from './entities/main-service.schema';
import { FileServiceModule } from '../file-service/file-service.module';
import { SubServiceModule } from "../sub-service/sub-service.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MainService.name, schema: MainServiceSchema },
    ]),
    FileServiceModule,
    SubServiceModule
  ],
  controllers: [MainServiceController],
  providers: [MainServiceService],
})
export class MainServiceModule {}
