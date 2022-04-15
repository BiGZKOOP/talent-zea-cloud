import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionLogServiceService } from './transaction-log-service.service';
import { CreateTransactionLogServiceDto } from './dto/create-transaction-log-service.dto';
import { UpdateTransactionLogServiceDto } from './dto/update-transaction-log-service.dto';

@Controller('transaction-log-service')
export class TransactionLogServiceController {
  constructor(
    private readonly transactionLogServiceService: TransactionLogServiceService,
  ) {}

  @Post()
  async create(
    @Body() createTransactionLogServiceDto: CreateTransactionLogServiceDto,
  ) {
    return this.transactionLogServiceService.create(
      createTransactionLogServiceDto,
    );
  }

  @Get()
  findAll() {
    return this.transactionLogServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionLogServiceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionLogServiceDto: UpdateTransactionLogServiceDto,
  ) {
    return this.transactionLogServiceService.update(
      +id,
      updateTransactionLogServiceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionLogServiceService.remove(+id);
  }
}
