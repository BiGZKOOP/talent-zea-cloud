import { Customer } from '../../customer/entities/customer.schema';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SubService } from 'src/model/sub-service/entities/sub-service.schema';

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

  expressDelivery: {
    price: number;
  };

  sourceFiles: {
    price: boolean;
  };

  revisions: {
    price: number;
    count: number;
  };
  @IsNotEmpty()
  subServiceID: SubService;
}
