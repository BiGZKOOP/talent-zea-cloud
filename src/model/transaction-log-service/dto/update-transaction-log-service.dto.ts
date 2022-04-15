import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionLogServiceDto } from './create-transaction-log-service.dto';

export class UpdateTransactionLogServiceDto extends PartialType(CreateTransactionLogServiceDto) {}
