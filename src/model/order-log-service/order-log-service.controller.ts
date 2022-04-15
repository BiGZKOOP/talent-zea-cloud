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
import { OrderLogServiceService } from './order-log-service.service';
import { CreateOrderLogServiceDto } from './dto/create-order-log-service.dto';
import { UpdateOrderLogServiceDto } from './dto/update-order-log-service.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';

@Controller('order-log-service')
export class OrderLogServiceController {
  constructor(
    private readonly orderLogServiceService: OrderLogServiceService,
  ) {}

  @Post()
  async create(
    @Body() createOrderLogServiceDto: CreateOrderLogServiceDto,
    @Res() response: Response,
  ) {
    const schema = Joi.object({
      orderID: Joi.string().required(),
      logStatus: Joi.number().required(),
    });
    const validation = schema.validate(createOrderLogServiceDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      try {
        const orderLogModel: CreateOrderLogServiceDto = validation.value;
        const orderLog = await this.orderLogServiceService.create(
          orderLogModel,
        );
        if (orderLog) {
          response.status(201).send({
            statusCode: HttpStatus.OK,
            message: 'Order log created',
            data: orderLog,
          });
        }
      } catch (error) {
        console.log(error);
        response.status(401).send(error);
      }
    }
    return this.orderLogServiceService.create(createOrderLogServiceDto);
  }

  @Get()
  findAll() {
    return this.orderLogServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderLogServiceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderLogServiceDto: UpdateOrderLogServiceDto,
  ) {
    return this.orderLogServiceService.update(+id, updateOrderLogServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderLogServiceService.remove(id);
  }
}
