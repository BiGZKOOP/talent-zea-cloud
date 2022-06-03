import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequiredPageDto } from './dto/create-required-page.dto';
import { UpdateRequiredPageDto } from './dto/update-required-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  RequiredPageDocument,
  RequiredPageEntity,
} from './entities/required-page.schema';
import { Model } from 'mongoose';
import { SubServiceService } from '../sub-service/sub-service.service';

@Injectable()
export class RequiredPageService {
  constructor(
    @InjectModel(RequiredPageEntity.name)
    private readonly requiredModel: Model<RequiredPageDocument>,
    private readonly subService: SubServiceService,
  ) {}

  async create(createRequiredPageDto: CreateRequiredPageDto) {
    try {
      const isSubService = await this.subService.findOne(
        createRequiredPageDto.subService,
      );
      if (isSubService) {
        const reqLog = new this.requiredModel(createRequiredPageDto);
        const reqPage = await reqLog.save();
        if (reqPage) {
          const updateReqID = await this.subService.updateReqID(
            createRequiredPageDto.subService,
            reqPage._id,
          );
          if (updateReqID) {
            return reqPage;
          }
        }
      } else {
        throw new NotFoundException();
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
