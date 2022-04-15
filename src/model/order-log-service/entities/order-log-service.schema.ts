import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { OrderService } from '../../order-service/entities/order-service.schema';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type OrderLogDocument = OrderLogService & Document;

@Schema({ timestamps: true })
export class OrderLogService {
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
  @Prop()
  logStatus: number;
}

export const OrderLogSchema = SchemaFactory.createForClass(OrderLogService);
