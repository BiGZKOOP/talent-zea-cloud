import { Module } from '@nestjs/common';
import { OrderLogServiceService } from './order-log-service.service';
import { OrderLogServiceController } from './order-log-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderLogSchema,
  OrderLogService,
} from './entities/order-log-service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderLogService.name, schema: OrderLogSchema },
    ]),
  ],
  controllers: [OrderLogServiceController],
  providers: [OrderLogServiceService],
  exports: [OrderLogServiceService],
})
export class OrderLogServiceModule {}
