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
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { SubServiceService } from './sub-service.service';
import { CreateSubServiceDto } from './dto/create-sub-service.dto';
import { UpdateSubServiceDto } from './dto/update-sub-service.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('sub-service')
export class SubServiceController {
  constructor(private readonly subServiceService: SubServiceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
      { name: 'image4', maxCount: 1 },
      { name: 'image5', maxCount: 1 },
      { name: 'image6', maxCount: 1 },
      { name: 'image7', maxCount: 1 },
      { name: 'image8', maxCount: 1 },
      { name: 'image9', maxCount: 1 },
      { name: 'image10', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createSubServiceDto: CreateSubServiceDto,
    @Res() response: Response,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File;
      image2?: Express.Multer.File;
      image3?: Express.Multer.File;
      image4?: Express.Multer.File;
      image5?: Express.Multer.File;
      image6?: Express.Multer.File;
      image7?: Express.Multer.File;
      image8?: Express.Multer.File;
      image9?: Express.Multer.File;
      image10?: Express.Multer.File;
    },
  ) {
    const schema = Joi.object({
      mainTopic: Joi.string().required(),
      subTopic: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      faq: Joi.array().items(Joi.object()).required(),
      expressDelivery: Joi.object({}),
      sourceFiles: Joi.object({}),
      revisions: Joi.object({}),
      orderTopic: Joi.string().required(),
      orderDescription: Joi.string().required(),
      deliveryTime: Joi.string().required(),
    });
    const validation = schema.validate(createSubServiceDto);
    if (!validation.error) {
      response.status(401).send(validation.error);
    } else {
      const subServiceModel: CreateSubServiceDto = validation.value;
      try {
        const subService = await this.subServiceService.create(subServiceModel);
        if (subService && files) {
          let image;
          if (files.image1[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image1[0].buffer,
              files.image1[0].originalname,
              files.image1[0].fieldname,
            );
          }
          if (files.image2[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image2[0].buffer,
              files.image2[0].originalname,
              files.image2[0].fieldname,
            );
          }
          if (files.image3[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image3[0].buffer,
              files.image3[0].originalname,
              files.image3[0].fieldname,
            );
          }
          if (files.image4[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image4[0].buffer,
              files.image4[0].originalname,
              files.image4[0].fieldname,
            );
          }
          if (files.image5[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image5[0].buffer,
              files.image5[0].originalname,
              files.image5[0].fieldname,
            );
          }
          if (files.image6[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image6[0].buffer,
              files.image6[0].originalname,
              files.image6[0].fieldname,
            );
          }
          if (files.image7[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image7[0].buffer,
              files.image7[0].originalname,
              files.image7[0].fieldname,
            );
          }
          if (files.image8[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image8[0].buffer,
              files.image8[0].originalname,
              files.image8[0].fieldname,
            );
          }
          if (files.image9[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image9[0].buffer,
              files.image9[0].originalname,
              files.image9[0].fieldname,
            );
          }
          if (files.image10[0]) {
            image = await this.subServiceService.addServiceImage(
              subService._id,
              files.image10[0].buffer,
              files.image10[0].originalname,
              files.image10[0].fieldname,
            );
          }
          if (image && image) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'SubService created successfully',
              image,
              data: subService,
            });
          }
        } else {
          if (subService) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'SubService created successfully',
              data: subService,
            });
          }
        }
      } catch (error) {
        console.log(error);
        response.status(401).send(error);
      }
    }
  }

  @Get()
  async findAll() {
    return await this.subServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subServiceService.findOne(id);
  }

  @Get('main/:id')
  async getSubMainService(@Param('id') id: string) {
    return this.subServiceService.getSubMainService(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
      { name: 'image4', maxCount: 1 },
      { name: 'image5', maxCount: 1 },
      { name: 'image6', maxCount: 1 },
      { name: 'image7', maxCount: 1 },
      { name: 'image8', maxCount: 1 },
      { name: 'image9', maxCount: 1 },
      { name: 'image10', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateSubServiceDto: UpdateSubServiceDto,
    @Res() response: Response,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File;
      image2?: Express.Multer.File;
      image3?: Express.Multer.File;
      image4?: Express.Multer.File;
      image5?: Express.Multer.File;
      image6?: Express.Multer.File;
      image7?: Express.Multer.File;
      image8?: Express.Multer.File;
      image9?: Express.Multer.File;
      image10?: Express.Multer.File;
    },
  ) {
    const schema = Joi.object({
      mainTopic: Joi.string(),
      subTopic: Joi.string(),
      description: Joi.string(),
      faq: Joi.array().items(Joi.object()),
      price: Joi.string(),
      expressDelivery: Joi.object({}),
      sourceFiles: Joi.object({}),
      revisions: Joi.object({}),
      orderTopic: Joi.string().required(),
      orderDescription: Joi.string().required(),
      deliveryTime: Joi.string().required(),
    });
    const validation = schema.validate(updateSubServiceDto);
    if (!validation.error) {
      response.status(401).send(validation.error);
    } else {
      const subServiceModel: UpdateSubServiceDto = validation.value;
      if (Object.keys(files).length !== 0) {
        try {
          const updateService = await this.subServiceService.update(
            id,
            subServiceModel,
          );
          if (updateService && files) {
            let image;
            if (files.image1 && files.image1[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image1[0].buffer,
                files.image1[0].originalname,
                files.image1[0].fieldname,
              );
            }
            if (files.image2 && files.image2[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image2[0].buffer,
                files.image2[0].originalname,
                files.image2[0].fieldname,
              );
            }
            if (files.image3 && files.image3[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image3[0].buffer,
                files.image3[0].originalname,
                files.image3[0].fieldname,
              );
            }
            if (files.image4[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image4[0].buffer,
                files.image4[0].originalname,
                files.image4[0].fieldname,
              );
            }
            if (files.image5[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image5[0].buffer,
                files.image5[0].originalname,
                files.image5[0].fieldname,
              );
            }
            if (files.image6[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image6[0].buffer,
                files.image6[0].originalname,
                files.image6[0].fieldname,
              );
            }
            if (files.image7[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image7[0].buffer,
                files.image7[0].originalname,
                files.image7[0].fieldname,
              );
            }
            if (files.image8[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image8[0].buffer,
                files.image8[0].originalname,
                files.image8[0].fieldname,
              );
            }
            if (files.image9[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image9[0].buffer,
                files.image9[0].originalname,
                files.image9[0].fieldname,
              );
            }
            if (files.image10[0]) {
              image = await this.subServiceService.addServiceImage(
                updateService._id,
                files.image10[0].buffer,
                files.image10[0].originalname,
                files.image10[0].fieldname,
              );
            }

            if (image && image) {
              response.status(201).send({
                statusCode: HttpStatus.OK,
                message: 'SubService Update successfully',
                image,
                data: updateService,
              });
            }
          }
        } catch (error) {
          console.log(error);
          response.status(401).send(error);
        }
      } else {
        try {
          const updateService = await this.subServiceService.update(
            id,
            subServiceModel,
          );
          if (updateService) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'SubService Update successfully',
              data: updateService,
            });
          }
        } catch (error) {
          console.log(error);
          response.status(401).send(error);
        }
      }
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.subServiceService.remove(+id);
  }

  @Patch('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteSubService(@Param('id') id: string, @Res() response: Response) {
    try {
      const deleteSubServices = await this.subServiceService.deleteSubService(
        id,
      );
      if (deleteSubServices) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          message: 'SubService Delete successfully',
          data: deleteSubServices,
        });
      }
    } catch (error) {
      console.log(error);
      response.status(401).send(error);
    }
  }
}
