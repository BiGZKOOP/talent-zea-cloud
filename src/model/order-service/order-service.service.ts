import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderServiceDto } from './dto/create-order-service.dto';
import { UpdateOrderServiceDto } from './dto/update-order-service.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {
  OrderService,
  OrderServiceDocument,
} from './entities/order-service.schema';
import { Model } from 'mongoose';
import { OrderLogServiceService } from '../order-log-service/order-log-service.service';
import { StripeService } from '../stripe/stripe.service';
import { TransactionLogServiceService } from '../transaction-log-service/transaction-log-service.service';

@Injectable()
export class OrderServiceService {
  constructor(
    @InjectModel(OrderService.name)
    private orderModel: Model<OrderServiceDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
    private orderLogService: OrderLogServiceService,
    private stripeService: StripeService,
    private transactionService: TransactionLogServiceService,
  ) {}
  async create(orderData: CreateOrderServiceDto): Promise<any> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const createOrder = new this.orderModel(orderData);
      const order = await createOrder.save();
      if (order) {
        const orderLog = await this.orderLogService.create({
          orderID: order._id,
          logStatus: 0,
        });
        if (orderLog) {
          let stripePayment = null;
          try {
            stripePayment = await this.stripeService.charge(
              orderData.amount,
              orderData.paymentMethodId,
              orderData.stripeCustomerId,
            );
          } catch (error) {
            console.log(error);
            if (error.type === 'StripeInvalidRequestError') {
              const deleteOrder = await this.orderModel.deleteMany({
                _id: order._id,
              });
              if (deleteOrder) {
                const deleteOrderLog = await this.orderLogService.remove(
                  order._id,
                );
                if (deleteOrderLog) {
                  throw new HttpException(
                    'Transaction failed, Try aging !',
                    HttpStatus.BAD_REQUEST,
                  );
                }
              }
            }
          }

          if (stripePayment) {
            const transactionLog = await this.transactionService.create({
              orderID: order._id,
              customerID: orderData.customerID,
            });
            if (transactionLog) {
              return transactionLog;
            }
          }
        }
      }
      await session.commitTransaction();
      await session.endSession();
      return order;
    } catch (error) {
      await session.abortTransaction();

      throw error;
    } finally {
      await session.endSession();
    }
  }

  async getSingleOrder(id: string) {
    try {
      const singleOrder = await this.orderModel.findById(id);
      if (singleOrder) {
        return singleOrder;
      }
      throw new NotFoundException();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async findAllOrderBelongToSingleCustomer(id: string) {
    try {
      const singleOrder = await this.orderModel.find({ customerID: id });
      if (singleOrder) {
        return singleOrder;
      }
      throw new NotFoundException();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async findAll() {
    return this.orderModel.find();
  }

  async findOne(_id: string) {
    const order = await this.orderModel.findOne({ _id });
    if (order) {
      return order;
    }
    throw new HttpException(
      'Order with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: string, updateOrderServiceDto: UpdateOrderServiceDto) {
    const updateOrder = await this.orderModel
      .findByIdAndUpdate(id, {
        ...updateOrderServiceDto,
      })
      .setOptions({ new: true });
    if (!updateOrder) {
      throw new NotFoundException();
    }
    return updateOrder;
  }

  remove(id: number) {
    return `This action removes a #${id} orderService`;
  }
}
