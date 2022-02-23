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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() response: Response,
  ) {
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
    });
    const validation = schema.validate(createCustomerDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      const customerModel: CreateCustomerDto = validation.value;
      try {
        const customer = await this.customerService.create(customerModel);
        if (customer) {
          response.status(201).send({
            statusCode: HttpStatus.OK,
            message: 'Customer created successfully',
            customer,
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
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
