import { OrderService } from '../../order-service/entities/order-service.schema';
import { IsNotEmpty, IsString } from 'class-validator';
import { Customer } from '../../customer/entities/customer.schema';

export class CreateTransactionLogServiceDto {
  @IsString()
  @IsNotEmpty()
  orderID: OrderService;
  @IsString()
  @IsNotEmpty()
  customerID: Customer;
}
