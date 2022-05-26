import { IsNotEmpty, IsString } from 'class-validator';
import { OrderService } from '../../order-service/entities/order-service.schema';

export class CreateSourceFileDto {
  @IsString()
  @IsNotEmpty()
  orderID: OrderService;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  sourceFile: string;
}
