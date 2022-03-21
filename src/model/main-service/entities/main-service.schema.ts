import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
  subTopic: string;
}

export const MainServiceSchema = SchemaFactory.createForClass(MainService);
