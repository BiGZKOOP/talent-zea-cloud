import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type RequiredPageDocument = RequiredPageEntity & Document;

@Schema({ timestamps: true })
export class RequiredPageEntity {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop()
  meta_data: [
    {
      id: string;
      label: string;
      description?: string;
      placeHolder?: string;
    },
  ];
}

export const RequiredPageSchema =
  SchemaFactory.createForClass(RequiredPageEntity);
