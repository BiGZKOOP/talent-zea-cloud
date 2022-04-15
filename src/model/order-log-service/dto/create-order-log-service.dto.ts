import { OrderService } from '../../order-service/entities/order-service.schema';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderLogServiceDto {
  @IsString()
  @IsNotEmpty()
  orderID: OrderService;
  @IsNumber()
  @IsNotEmpty()
  logStatus: number;
}
