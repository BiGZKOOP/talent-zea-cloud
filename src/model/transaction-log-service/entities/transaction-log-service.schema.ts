import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  OrderService,
  OrderServiceSchema,
} from '../../order-service/entities/order-service.schema';
import { Type } from 'class-transformer';
import {
  Customer,
  CustomerSchema,
} from '../../customer/entities/customer.schema';
import mongoose from 'mongoose';

export type TransactionDocument = TransactionLogService & Document;

@Schema()
export class TransactionLogService {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: OrderService.name })
  @Type(() => OrderService)
  orderID: OrderService;
  @Prop({ type: mongoose.Schema.Types.String, ref: Customer.name })
  @Type(() => Customer)
  customerID: Customer;
}
export const TransactionSchema = SchemaFactory.createForClass(
  TransactionLogService,
);
