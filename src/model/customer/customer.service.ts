import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './entities/customer.schema';
import { RegisterDto } from '../authentication/dto/register.dto';
import { FileServiceService } from '../file-service/file-service.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>,
    private readonly fileUploadService: FileServiceService,
    private readonly stripeService: StripeService,
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

  async findByUserName(name: string): Promise<Customer> {
    const user = await this.customerModel.findOne({ name });
    console.log(user);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async findByUserEmail(email: string): Promise<Customer> {
    const user = await this.customerModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const stripeCustomer = await this.stripeService.createCustomer(
        createCustomerDto.name,
        createCustomerDto.email,
      );
      if (stripeCustomer) {
        try {
          try {
            if (createCustomerDto.userType === 'refUser') {
              const checkMainUser = await this.getById(
                createCustomerDto.referralID,
              );
              if (checkMainUser) {
                const createCustomer = new this.customerModel({
                  ...createCustomerDto,
                  referralCount: 0,
                  stripeCustomerId: stripeCustomer.id,
                });
                const customer = await createCustomer.save();
                if (customer) {
                  const refCount = checkMainUser.referralCount++;
                  const updateNewUser =
                    await this.customerModel.findByIdAndUpdate(
                      createCustomerDto.referralID,
                      {
                        ...checkMainUser,
                        referralCount: refCount,
                      },
                    );
                  if (updateNewUser) {
                    return customer;
                  }
                }
              }
            } else {
              const createCustomer = new this.customerModel({
                ...createCustomerDto,
                referralCount: 0,
                stripeCustomerId: stripeCustomer.id,
              });
              const customer = await createCustomer.save();
              if (customer) {
                return customer;
              }
            }
          } catch (error) {
            if (error?.code === 11000) {
              throw new HttpException('11000', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('2005', HttpStatus.NOT_FOUND);
          }
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async addImage(id: string, imageBuffer: Buffer, filename: string) {
    const image = await this.fileUploadService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    // console.log('Log 2', image);
    const item = await this.getById(id);
    // console.log('log 3', item);
    const userId = item._id;
    const update = await this.customerModel.findByIdAndUpdate(userId, {
      image: image.url,
    });
    if (update) {
      return image;
    }
    // console.log('log 4 ', image);
    return image;
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
  async findAll(documentsToSkip = 0, limitOfDocuments?: number) {
    const findQuery = this.customerModel
      .find()
      .sort({ _id: 1 })
      .skip(documentsToSkip)
      .populate('countryCode')
      .populate('name');
    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }
    const results = await findQuery;
    const count = await this.customerModel.count();

    return { results, count };
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customerUpdate = await this.customerModel
      .findByIdAndUpdate(id, { ...updateCustomerDto })
      .setOptions({ overwrite: true, new: true });
    if (!customerUpdate) {
      throw new NotFoundException();
    }
    return customerUpdate;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
