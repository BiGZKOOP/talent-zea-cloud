import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  FileService,
  FileServiceSchema,
} from '../../file-service/entities/file-service.schema';
import { Type } from 'class-transformer';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  nicNumber: string;
  // @Prop()
  // password: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  countryCode: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  dob: string;
  @Prop({ required: false })
  currentHashedRefreshToken?: string;
  @Prop({ required: false, type: FileServiceSchema })
  @Type(() => FileService)
  @Prop({ required: false })
  image?: string;
  @Prop()
  userType: string;
  @Prop()
  referralID?: string;
  @Prop()
  referralCount: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
