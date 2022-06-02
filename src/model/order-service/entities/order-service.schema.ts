import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../../customer/entities/customer.schema';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { SubService } from 'src/model/sub-service/entities/sub-service.schema';

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
  orderMonth: number;
  @Prop()
  amount: number;
  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  expressDelivery: {
    price: number;
  };

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  sourceFiles: {
    price: boolean;
  };

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  revisions: {
    price: number;
    count: number;
  };
  @Prop({ type: mongoose.Schema.Types.String, ref: SubService.name })
  @Type(() => SubService)
  subServiceID: SubService;

  @Prop()
  meta_data?: [
    {
      key?: string;
      value?: string;
    },
  ];
}
export const OrderServiceSchema = SchemaFactory.createForClass(OrderService);
