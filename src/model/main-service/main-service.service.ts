import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMainServiceDto } from './dto/create-main-service.dto';
import { UpdateMainServiceDto } from './dto/update-main-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  MainService,
  MainServiceDocument,
} from './entities/main-service.schema';
import { Model } from 'mongoose';

@Injectable()
export class MainServiceService {
  constructor(
    @InjectModel(MainService.name)
    private readonly mainServiceModel: Model<MainServiceDocument>,
  ) {}

  async create(
    createMainServiceDto: CreateMainServiceDto,
  ): Promise<MainService> {
    try {
      const createMainService = new this.mainServiceModel(createMainServiceDto);
      const mService = await createMainService.save();
      if (mService) {
        return mService;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const allMainService = await this.mainServiceModel.find();
      if (allMainService) {
        return allMainService;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const singleService = await this.mainServiceModel.findById(id);
      if (!singleService) {
        throw new NotFoundException();
      }
      return singleService;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: string, updateMainServiceDto: UpdateMainServiceDto) {
    const updateMService = await this.mainServiceModel
      .findByIdAndUpdate(id, { ...updateMainServiceDto })
      .setOptions({ overwrite: true, new: true });
    if (!updateMService) {
      throw new NotFoundException();
    }
    return updateMService;
  }

  async remove(id: string) {
    const deleteService = await this.mainServiceModel.findByIdAndDelete(id);
    if (!deleteService) {
      throw new NotFoundException();
    }
    return deleteService;
  }
}
