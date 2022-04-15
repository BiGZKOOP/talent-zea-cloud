import { Module } from '@nestjs/common';
import { TransactionLogServiceService } from './transaction-log-service.service';
import { TransactionLogServiceController } from './transaction-log-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionLogService,
  TransactionSchema,
} from './entities/transaction-log-service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionLogService.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionLogServiceController],
  providers: [TransactionLogServiceService],
  exports: [TransactionLogServiceService],
})
export class TransactionLogServiceModule {}
