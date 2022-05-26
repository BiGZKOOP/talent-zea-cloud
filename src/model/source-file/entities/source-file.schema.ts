import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { OrderService } from '../../order-service/entities/order-service.schema';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type SourceFileDocument = SourceFile & Document;

@Schema({ timestamps: true })
export class SourceFile {
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
  description: string;
  @Prop()
  sourceFile: string;
}

export const SourceFileSchema = SchemaFactory.createForClass(SourceFile);
