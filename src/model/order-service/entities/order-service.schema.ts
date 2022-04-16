import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../../customer/entities/customer.schema';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type OrderServiceDocument = OrderService & Document;

@Schema({ timestamps: true })
export class OrderService {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;
  @Prop({ type: mongoose.Schema.Types.String, ref: Customer.name })
  @Type(() => Customer)
  customerID: Customer;
  @Prop()
  orderStatus: number;
  @Prop()
  amount: number;
}
export const OrderServiceSchema = SchemaFactory.createForClass(OrderService);
