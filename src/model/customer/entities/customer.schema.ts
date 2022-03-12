import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
  @Prop()
  password: string;
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
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
