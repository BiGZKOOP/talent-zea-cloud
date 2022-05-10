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
} from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { CreateOrderServiceDto } from './dto/create-order-service.dto';
import { UpdateOrderServiceDto } from './dto/update-order-service.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';

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
        const orderModel: CreateOrderServiceDto = validation.value;
        const order = await this.orderServiceService.create(orderModel);
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
