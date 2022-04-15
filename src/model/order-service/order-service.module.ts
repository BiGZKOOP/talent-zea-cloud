import { Module } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { OrderServiceController } from './order-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderService,
  OrderServiceSchema,
} from './entities/order-service.schema';
import { OrderLogServiceModule } from '../order-log-service/order-log-service.module';
import { StripeModule } from '../stripe/stripe.module';
import { TransactionLogServiceModule } from '../transaction-log-service/transaction-log-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderService.name, schema: OrderServiceSchema },
    ]),
    OrderLogServiceModule,
    StripeModule,
    TransactionLogServiceModule,
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
