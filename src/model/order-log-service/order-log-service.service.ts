import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderLogServiceDto } from './dto/create-order-log-service.dto';
import { UpdateOrderLogServiceDto } from './dto/update-order-log-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  OrderLogDocument,
  OrderLogService,
} from './entities/order-log-service.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderLogServiceService {
  @InjectModel(OrderLogService.name)
  private orderLogModel: Model<OrderLogDocument>;
  async create(createOrderLogServiceDto: any): Promise<any> {
    try {
      const createOrderLog = new this.orderLogModel(createOrderLogServiceDto);
      const orderLog = await createOrderLog.save();
      if (orderLog) {
        return orderLog;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all orderLogService`;
  }

  async findOne(id: string) {
    const order = await this.orderLogModel
      .find({ orderID: id })
      .populate('orderID');
    if (order) {
      return order;
    }
    throw new HttpException(
      'Order with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: number, updateOrderLogServiceDto: UpdateOrderLogServiceDto) {
    return `This action updates a #${id} orderLogService`;
  }

  async remove(orderID: string) {
    return this.orderLogModel.deleteMany({ orderID: orderID });
  }
}
