import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type FileServiceDocument = FileService & Document;

@Schema()
export class FileService {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;
  @Prop()
  url: string;
  @Prop()
  key: string;
}
export const FileServiceSchema = SchemaFactory.createForClass(FileService);
