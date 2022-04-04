import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';
import MongooseClassSerializerInterceptor from '../../config/mongooseClassSerializer.interceptor';
import { CustomerSchema } from './entities/customer.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationParams } from '../../helpers/PaginationParams';

@Controller('customer')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@UseInterceptors(MongooseClassSerializerInterceptor(CustomerSchema))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() response: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      nicNumber: Joi.string().required(),
      // password: Joi.string().required(),
      email: Joi.string().required(),
      countryCode: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      dob: Joi.string().required(),
      userType: Joi.string(),
      referralID: Joi.string(),
    });
    const validation = schema.validate(createCustomerDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      const customerModel: CreateCustomerDto = validation.value;
      try {
        const customer = await this.customerService.create(customerModel);
        if (customer && file) {
          const image = await this.customerService.addImage(
            customer._id,
            file.buffer,
            file.originalname,
          );
          if (image) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'Customer created successfully',
              image,
              customer,
            });
          }
        } else {
          if (customer) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'Customer created successfully',
              customer,
            });
          }
        }
      } catch (error) {
        if (error?.code === 11000) {
          throw new HttpException(
            'User with that email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (error?.response === '2005') {
          throw new HttpException(
            'User with that Referral ID does not valid',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (error?.response === '11000') {
          throw new HttpException(
            'User with that email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Res() response: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      nicNumber: Joi.string().required(),
      // password: Joi.string().required(),
      email: Joi.string().required(),
      countryCode: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      dob: Joi.string().required(),
    });
    const validation = schema.validate(updateCustomerDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      const customerModel: UpdateCustomerDto = validation.value;
      try {
        const updateCustomer = await this.customerService.update(
          id,
          customerModel,
        );
        if (updateCustomer && file) {
          const updateID = updateCustomer._id;
          const image = await this.customerService.addImage(
            updateID,
            file.buffer,
            file.originalname,
          );
          if (image) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'Customer Update successfully',
              image,
              updateCustomer,
            });
          }
        } else {
          if (updateCustomer) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'Customer Update successfully',
              updateCustomer,
            });
          }
        }
      } catch (error) {
        console.log(error);
        response.status(401).send(error);
      }
    }
  }

  @Get(':me')
  async getCurrentUser(@Res() response: Response, @Param('me') me: string) {
    try {
      const data = await this.customerService.getByEmail(me);
      if (data) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          message: 'Customer Is in-the DB',
          data,
        });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'User with this name does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get()
  async getAllCustomer(@Query() { skip, limit }: PaginationParams) {
    return this.customerService.findAll(skip, limit);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
