import { Injectable } from '@nestjs/common';
import { CreateRequiredPageDto } from './dto/create-required-page.dto';
import { UpdateRequiredPageDto } from './dto/update-required-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  RequiredPageDocument,
  RequiredPageEntity,
} from './entities/required-page.schema';
import { Model } from 'mongoose';

@Injectable()
export class RequiredPageService {
  @InjectModel(RequiredPageEntity.name)
  private readonly requiredModel: Model<RequiredPageDocument>;
  async create(createRequiredPageDto: CreateRequiredPageDto) {
    try {
      const reqLog = new this.requiredModel(createRequiredPageDto);
      const reqPage = await reqLog.save();
      if (reqPage) {
        return reqPage;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all requiredPage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requiredPage`;
  }

  async update(id: string, updateRequiredPageDto: UpdateRequiredPageDto) {
    try {
      const reqPage = await this.requiredModel
        .findOneAndUpdate({ _id: id }, updateRequiredPageDto)
        .setOptions({ new: true });
      if (reqPage) {
        return reqPage;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} requiredPage`;
  }
}
