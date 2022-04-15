import { Injectable } from '@nestjs/common';
import { CreateTransactionLogServiceDto } from './dto/create-transaction-log-service.dto';
import { UpdateTransactionLogServiceDto } from './dto/update-transaction-log-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  TransactionDocument,
  TransactionLogService,
} from './entities/transaction-log-service.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionLogServiceService {
  @InjectModel(TransactionLogService.name)
  private transactionModel: Model<TransactionDocument>;
  async create(transactionData: any): Promise<TransactionLogService> {
    try {
      const createTransaction = new this.transactionModel(transactionData);
      const transaction = await createTransaction.save();
      if (transaction) {
        return transaction;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all transactionLogService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionLogService`;
  }

  update(
    id: number,
    updateTransactionLogServiceDto: UpdateTransactionLogServiceDto,
  ) {
    return `This action updates a #${id} transactionLogService`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionLogService`;
  }
}
