import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export type MainServiceDocument = MainService & Document;

@Schema()
export class MainService {
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
  mainTopicDescription: string;
  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  image: {
    image1: string;
    image2: string;
    image3: string;
  };
}

export const MainServiceSchema = SchemaFactory.createForClass(MainService);
