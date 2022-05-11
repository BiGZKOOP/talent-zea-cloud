import {
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
  async create(
    orderData: CreateOrderServiceDto,
    monthValue: any,
  ): Promise<any> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const createOrder = new this.orderModel({
        ...orderData,
        orderMonth: monthValue,
      });
      const order = await createOrder.save({ session });
      if (order) {
        const orderLog = await this.orderLogService.create(
          {
            orderID: order._id,
            logStatus: 0,
          },
          session,
        );
        if (orderLog) {
          let stripePayment = null;
          stripePayment = await this.stripeService.charge(
            orderData.amount,
            orderData.paymentMethodId,
            orderData.stripeCustomerId,
          );

          if (stripePayment) {
            await this.transactionService.create(
              {
                orderID: order._id,
                customerID: orderData.customerID,
              },
              session,
            );
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
      const singleOrder = await this.orderModel
        .findById(id)
        .populate('customerID')
        .populate({
          path: 'subServiceID',
          populate: { path: 'mainService' },
        });
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
      const singleOrder = await this.orderModel
        .find({ customerID: id })
        .populate('customerID')
        .populate({
          path: 'subServiceID',
          populate: { path: 'mainService' },
        });
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
  async getOrderByStatus(state: number): Promise<OrderService[]> {
    try {
      const orderState = await this.orderModel.find({ orderStatus: state });
      if (orderState) {
        return orderState;
      }
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getOrderByMonth(month: number): Promise<OrderService[]> {
    try {
      const orderState = await this.orderModel.find({ orderMonth: month });
      if (orderState) {
        return orderState;
      }
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(_id: string) {
    const order = await this.orderModel
      .findOne({ _id })
      .populate('customerID')
      .populate({
        path: 'subServiceID',
        populate: { path: 'mainService' },
      });
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
