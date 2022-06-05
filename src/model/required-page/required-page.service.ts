import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createRequiredPageDto: CreateRequiredPageDto, id: string) {
    try {
      const isSubService = await this.subService.findOne(id);
      if (isSubService) {
        const reqLog = new this.requiredModel(createRequiredPageDto);
        const reqPage = await reqLog.save();
        if (reqPage) {
          const updateReqID = await this.subService.updateReqID(
            id,
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

  async remove(id: string, subID: string) {
    try {
      const findSubService = await this.subService.findOne(subID);
      if (findSubService) {
        const deleteReqFromSub = await this.subService.deleteReqPage(subID);
        if (deleteReqFromSub) {
          const deleteReq = await this.requiredModel.findOneAndDelete({
            _id: id,
          });
          if (deleteReq) {
            return deleteReq;
          }
        }
      } else {
        throw new HttpException('There is an error', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
