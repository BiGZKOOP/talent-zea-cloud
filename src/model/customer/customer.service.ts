import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './entities/customer.schema';
import { RegisterDto } from '../authentication/dto/register.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>,
  ) {}

  async getByEmail(email: string): Promise<Customer> {
    const user = await this.customerModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const createCustomer = new this.customerModel(createCustomerDto);
      const customer = await createCustomer.save();
      if (customer) {
        return customer;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async register(registrationData: RegisterDto): Promise<Customer> {
    try {
      const createCustomer = new this.customerModel(registrationData);
      const customer = await createCustomer.save();
      if (customer) {
        return customer;
      }
    } catch (error) {
      throw error;
    }
  }

  async getById(_id: string) {
    const user = await this.customerModel.findOne({ _id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async setCurrentRefreshToken(refreshToken: string, _id: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.customerModel.updateOne(
      { _id },
      {
        currentHashedRefreshToken,
      },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, _id: string) {
    const user = await this.getById(_id);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(_id: string) {
    return this.customerModel.updateOne(
      { _id },
      {
        currentHashedRefreshToken: null,
      },
    );
  }
  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
