import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
import { MainService } from '../../main-service/entities/main-service.schema';
import { Type } from 'class-transformer';

export type MainServiceDocument = SubService & Document;

@Schema()
export class SubService {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;
  @Prop()
  mainTopic: string;
  @Prop()
  subTopic: string;
  @Prop()
  price: string;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.String, ref: MainService.name })
  @Type(() => MainService)
  mainService: MainService;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  image: {
    image1: string;
    image2: string;
    image3: string;
  };

  @Prop({ type: mongoose.Schema.Types.Array, required: true })
  faq: [
    {
      question: string;
      answers: string;
    },
  ];

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  expressDelivery: {
    hide: boolean;
    price: number;
    count: number;
  };

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  sourceFiles: {
    hide: boolean;
    price: boolean;
  };

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  revisions: {
    hide: boolean;
    price: number;
    count: number;
  };
  @Prop()
  archive?: boolean;
  @Prop()
  orderTopic: string;
  @Prop()
  orderDescription: string;
  @Prop()
  deliveryTime: string;
}

export const SubServiceSchema = SchemaFactory.createForClass(SubService);
