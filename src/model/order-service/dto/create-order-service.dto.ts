import { Customer } from '../../customer/entities/customer.schema';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderServiceDto {
  @IsString()
  @IsNotEmpty()
  customerID: Customer;
  @IsNumber()
  @IsNotEmpty()
  orderStatus: number;
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
  @IsString()
  @IsNotEmpty()
  stripeCustomerId: string;
  @IsNumber()
  amount: number;
}
