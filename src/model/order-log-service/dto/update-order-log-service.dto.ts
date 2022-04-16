import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderLogServiceDto } from './create-order-log-service.dto';

export class UpdateOrderLogServiceDto extends PartialType(CreateOrderLogServiceDto) {}
