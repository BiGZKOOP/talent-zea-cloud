import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMainServiceDto } from './dto/create-main-service.dto';
import { UpdateMainServiceDto } from './dto/update-main-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  MainService,
  MainServiceDocument,
} from './entities/main-service.schema';
import { Model } from 'mongoose';
import { FileServiceService } from '../file-service/file-service.service';
import { SubServiceService } from '../sub-service/sub-service.service';

@Injectable()
export class MainServiceService {
  constructor(
    @InjectModel(MainService.name)
    private readonly mainServiceModel: Model<MainServiceDocument>,
    private readonly fileUploadService: FileServiceService,
    private readonly subService: SubServiceService,
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

  async addServiceImage(
    id: string,
    imageBuffer: Buffer,
    filename: string,
    imageData: string,
  ) {
    if (imageData === 'image1') {
      const image = await this.fileUploadService.uploadPublicFile(
        imageBuffer,
        filename,
      );
      const item = await this.findOne(id);
      if (item) {
        const serviceId = item._id;
        const data = {
          mainTopicDescription: item.mainTopicDescription,
          mainTopic: item.mainTopic,
          image: {
            image1: image.url,
          },
        };
        await this.mainServiceModel
          .findByIdAndUpdate(serviceId, {
            ...data,
          })
          .setOptions({ overwrite: true, new: true });
        return image;
      } else {
        throw new NotFoundException();
      }
    }
    if (imageData === 'image2') {
      const image = await this.fileUploadService.uploadPublicFile(
        imageBuffer,
        filename,
      );
      const item = await this.findOne(id);
      if (item) {
        const serviceId = item._id;
        const data = {
          mainTopicDescription: item.mainTopicDescription,
          mainTopic: item.mainTopic,
          image: {
            image1: item.image.image1 ? item.image.image1 : undefined,
            image2: image.url,
          },
        };
        await this.mainServiceModel
          .findByIdAndUpdate(serviceId, {
            ...data,
          })
          .setOptions({ overwrite: true, new: true });
        return image;
      } else {
        throw new NotFoundException();
      }
    }
    if (imageData === 'image3') {
      const image = await this.fileUploadService.uploadPublicFile(
        imageBuffer,
        filename,
      );
      const item = await this.findOne(id);
      if (item) {
        const serviceId = item._id;
        const data = {
          mainTopicDescription: item.mainTopicDescription,
          mainTopic: item.mainTopic,
          image: {
            image1: item.image.image1 ? item.image.image1 : undefined,
            image2: item.image.image2 ? item.image.image2 : undefined,
            image3: image.url,
          },
        };
        await this.mainServiceModel
          .findByIdAndUpdate(serviceId, {
            ...data,
          })
          .setOptions({ overwrite: true, new: true });
        return image;
      } else {
        throw new NotFoundException();
      }
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

  async findOneMainServiceWithSubService(id: string) {
    try {
      const requestMainService = await this.mainServiceModel.findById(id);
      if (!requestMainService) {
        throw new NotFoundException();
      } else {
        const subMainService = await this.subService.getSubMainService(id);
        if (!subMainService) {
          throw new NotFoundException();
        }
        return { requestMainService, subMainService };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: string, updateMainServiceDto: UpdateMainServiceDto) {
    const updateMService = await this.mainServiceModel.findByIdAndUpdate(id, {
      ...updateMainServiceDto,
    });
    // .setOptions({ overwrite: true, new: true });
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
