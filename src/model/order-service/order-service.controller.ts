import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { CreateOrderServiceDto } from './dto/create-order-service.dto';
import { UpdateOrderServiceDto } from './dto/update-order-service.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';
import { OrderService } from './entities/order-service.schema';

@Controller('order-service')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @UseInterceptors(MongooseClassSerializerInterceptor(OrderServiceSchema))
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}
  @Post()
  async create(
    @Body() createOrderServiceDto: CreateOrderServiceDto,
    @Res() response: Response,
  ) {
    const schema = Joi.object({
      customerID: Joi.string().required(),
      orderStatus: Joi.number().required(),
      paymentMethodId: Joi.string().required(),
      stripeCustomerId: Joi.string().required(),
      amount: Joi.number().required(),
      expressDelivery: Joi.any(),
      sourceFiles: Joi.any(),
      revisions: Joi.any(),
      subServiceID: Joi.string().required(),
    });

    const validation = schema.validate(createOrderServiceDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      try {
        const month = new Date();
        const monthValue = month.getMonth();
        const orderModel: CreateOrderServiceDto = validation.value;
        const order = await this.orderServiceService.create(
          orderModel,
          monthValue,
        );
        if (order) {
          response.status(201).send({
            statusCode: HttpStatus.OK,
            message: 'Order successfully placed',
            data: order,
          });
        }
      } catch (error) {
        console.log(error);
        response.status(401).send(error);
      }
    }
  }

  @Get()
  findAll() {
    return this.orderServiceService.findAll();
  }

  @Get('order/:state')
  async getOrderByStatus(
    @Res() response: Response,
    @Param('state') state: number,
  ): Promise<OrderService[]> {
    if (state === 0 || 1 || 2 || -1) {
      try {
        const orderStatus = await this.orderServiceService.getOrderByStatus(
          state,
        );
        if (orderStatus) {
          response.status(201).send({
            statusCode: HttpStatus.OK,
            data: orderStatus,
          });
          return orderStatus;
        }
      } catch (error) {
        console.log(error);
        response.status(401).send(error);
      }
    } else {
      throw new HttpException('Not allowed', HttpStatus.NOT_FOUND);
    }
  }

  @Get('orders/:month')
  async getOrderByMonth(
    @Res() response: Response,
    @Param('month') month: number,
  ): Promise<OrderService[]> {
    try {
      const orderStatus = await this.orderServiceService.getOrderByMonth(month);
      if (orderStatus) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          data: orderStatus,
        });
        return orderStatus;
      }
    } catch (error) {
      console.log(error);
      response.status(401).send(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const oneOrder = await this.orderServiceService.getSingleOrder(id);
      if (oneOrder) {
        return oneOrder;
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('customer/:id')
  async findAllOrderBelongToSingleCustomer(@Param('id') id: string) {
    try {
      const oneOrder =
        await this.orderServiceService.findAllOrderBelongToSingleCustomer(id);
      if (oneOrder) {
        return oneOrder;
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('orders/:id')
  async updateOrderStatus(@Query('status',ParseIntPipe) status: number, @Param('id') id: string,){
   return   this.orderServiceService.updateOrderStatus(id,status)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderServiceDto: UpdateOrderServiceDto,
  ) {
    return this.orderServiceService.update(id, updateOrderServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderServiceService.remove(+id);
  }
}
function UseGuards(arg0: any) {
  throw new Error('Function not implemented.');
}

function AuthGuard(arg0: string): any {
  throw new Error('Function not implemented.');
}
