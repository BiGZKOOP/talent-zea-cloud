import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type SubServiceImageDocument = SubServiceImage & Document;

@Schema()
export class SubServiceImage {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;
  @Prop()
  image1: string;
  @Prop()
  image2: string;
  @Prop()
  image3: string;
}

export const SubServiceImageSchema =
  SchemaFactory.createForClass(SubServiceImage);
