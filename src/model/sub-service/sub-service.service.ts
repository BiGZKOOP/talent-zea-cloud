import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubServiceDto } from './dto/create-sub-service.dto';
import { UpdateSubServiceDto } from './dto/update-sub-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubService } from './entities/sub-service.schema';
import { Model } from 'mongoose';
import { FileServiceService } from '../file-service/file-service.service';

@Injectable()
export class SubServiceService {
  constructor(
    @InjectModel(SubService.name)
    private readonly subServiceModel: Model<SubService>,
    private readonly fileUploadService: FileServiceService,
  ) {}
  async create(createSubServiceDto: CreateSubServiceDto): Promise<SubService> {
    try {
      const createSubService = new this.subServiceModel({
        ...createSubServiceDto,
        archive: false,
      });
      const sService = await createSubService.save();
      if (sService) {
        return sService;
      }
    } catch (error) {
      console.log(error);
      return error;
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
          mainService: item.mainService,
          description: item.description,
          faq: item.faq,
          expressDelivery: item?.expressDelivery,
          sourceFiles: item?.sourceFiles,
          revisions: item?.revisions,
          subTopic: item.subTopic,
          mainTopic: item.mainTopic,
          orderTopic: item.orderTopic,
          orderDescription: item.orderDescription,
          deliveryTime: item.deliveryTime,
          price: item.price,
          image: {
            image1: image.url,
            image2: item.image?.image2 ? item.image.image2 : '',
            image3: item.image?.image3 ? item.image.image3 : '',
          },
        };
        await this.subServiceModel
          .findByIdAndUpdate(serviceId, {
            ...data,
          })
          .setOptions({ new: true });
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
          mainService: item.mainService,
          description: item.description,
          subTopic: item.subTopic,
          faq: item.faq,
          expressDelivery: item?.expressDelivery,
          sourceFiles: item?.sourceFiles,
          revisions: item?.revisions,
          mainTopic: item.mainTopic,
          orderTopic: item.orderTopic,
          orderDescription: item.orderDescription,
          deliveryTime: item.deliveryTime,
          price: item.price,
          image: {
            image1: item.image.image1 ? item.image.image1 : undefined,
            image2: image.url,
            image3: item.image.image3 ? item.image.image3 : undefined,
          },
        };
        await this.subServiceModel
          .findByIdAndUpdate(serviceId, {
            ...data,
          })
          .setOptions({ new: true });
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
          mainService: item.mainService,
          description: item.description,
          subTopic: item.subTopic,
          faq: item.faq,
          expressDelivery: item?.expressDelivery,
          sourceFiles: item?.sourceFiles,
          revisions: item?.revisions,
          mainTopic: item.mainTopic,
          orderTopic: item.orderTopic,
          orderDescription: item.orderDescription,
          deliveryTime: item.deliveryTime,
          price: item.price,
          image: {
            image1: item.image.image1 ? item.image.image1 : undefined,
            image2: item.image.image2 ? item.image.image2 : undefined,
            image3: image.url,
          },
        };
        await this.subServiceModel
          .findByIdAndUpdate(serviceId, {
            ...data,
          })
          .setOptions({ new: true });
        return image;
      } else {
        throw new NotFoundException();
      }
    }
  }

  async findAll() {
    try {
      const allSubService = await this.subServiceModel
        .find({ archive: false })
        .populate('mainService');
      if (allSubService) {
        return allSubService;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const singleService = await this.subServiceModel
        .findById(id)
        .populate('mainService', 'mainTopic').where('archive').equals(false)
      if (!singleService) {
        throw new NotFoundException();
      }
      return singleService;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getSubMainService(mainService: string) {
    try {
      const service = await this.subServiceModel
        .find({ mainService })
        .populate('mainService').where('archive').equals(false);
      if (!service) {
        throw new NotFoundException();
      }
      return service;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteSubService(id: string) {
    try {
      const updateSubService = await this.subServiceModel
        .findByIdAndUpdate(id, {
          archive: true,
        })
        .setOptions({ new: true });
      if (updateSubService) {
        return updateSubService;
      }
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'There is an error ',
        },
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: string, updateSubServiceDto: UpdateSubServiceDto) {
    const updateSubService = await this.subServiceModel
      .findByIdAndUpdate(id, {
        ...updateSubServiceDto,
      })
      .setOptions({ new: true });
    // .setOptions({ overwrite: true, new: true });
    if (!updateSubService) {
      throw new NotFoundException();
    }
    return updateSubService;
  }

  remove(id: number) {
    return `This action removes a #${id} subService`;
  }
}
