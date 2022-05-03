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
import { MainServiceService } from './main-service.service';
import { CreateMainServiceDto } from './dto/create-main-service.dto';
import { UpdateMainServiceDto } from './dto/update-main-service.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('main-service')
export class MainServiceController {
  constructor(private readonly mainServiceService: MainServiceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createMainServiceDto: CreateMainServiceDto,
    @Res() response: Response,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File;
      image2?: Express.Multer.File;
      image3?: Express.Multer.File;
    },
  ) {
    const schema = Joi.object({
      mainTopic: Joi.string().required(),
      mainTopicDescription: Joi.string().required(),
    });
    const validation = schema.validate(createMainServiceDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      const mainServiceModel: CreateMainServiceDto = validation.value;
      if (Object.keys(files).length !== 0) {
        try {
          const mainService = await this.mainServiceService.create(
            mainServiceModel,
          );
          if (mainService && files) {
            let image;
            if (files.image1[0]) {
              image = await this.mainServiceService.addServiceImage(
                mainService._id,
                files.image1[0].buffer,
                files.image1[0].originalname,
                files.image1[0].fieldname,
              );
            }
            if (files.image2[0]) {
              image = await this.mainServiceService.addServiceImage(
                mainService._id,
                files.image2[0].buffer,
                files.image2[0].originalname,
                files.image2[0].fieldname,
              );
            }
            if (files.image3[0]) {
              image = await this.mainServiceService.addServiceImage(
                mainService._id,
                files.image3[0].buffer,
                files.image3[0].originalname,
                files.image3[0].fieldname,
              );
            }

            if (image && image) {
              response.status(201).send({
                statusCode: HttpStatus.OK,
                message: 'MainService created successfully',
                image,
                data: mainService,
              });
            }
          }
        } catch (error) {
          console.log(error);
          response.status(401).send(error);
        }
      } else {
        try {
          const mainService = await this.mainServiceService.create(
            mainServiceModel,
          );
          if (mainService) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'MainService created successfully',
              data: mainService,
            });
          }
        } catch (error) {
          console.log(error);
          response.status(401).send(error);
        }
      }
    }
  }
  @Get()
  async findAll() {
    return await this.mainServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const singleData =
        await this.mainServiceService.findOneMainServiceWithSubService(id);
      if (singleData) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          message: 'MainService Found successfully',
          data: singleData,
        });
      }
    } catch (error) {
      console.log(error);
      response.status(401).send(error);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateMainServiceDto: UpdateMainServiceDto,
    @Res() response: Response,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File;
      image2?: Express.Multer.File;
      image3?: Express.Multer.File;
    },
  ) {
    const schema = Joi.object({
      mainTopic: Joi.string(),
      mainTopicDescription: Joi.string(),
    });
    const validation = schema.validate(updateMainServiceDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      const mainServiceModel: UpdateMainServiceDto = validation.value;
      if (Object.keys(files).length !== 0) {
        try {
          const updateService = await this.mainServiceService.update(
            id,
            mainServiceModel,
          );
          if (updateService && files) {
            let image;
            if (files.image1 && files.image1[0]) {
              image = await this.mainServiceService.addServiceImage(
                updateService._id,
                files.image1[0].buffer,
                files.image1[0].originalname,
                files.image1[0].fieldname,
              );
            }
            if (files.image2 && files.image2[0]) {
              image = await this.mainServiceService.addServiceImage(
                updateService._id,
                files.image2[0].buffer,
                files.image2[0].originalname,
                files.image2[0].fieldname,
              );
            }
            if (files.image3 && files.image3[0]) {
              image = await this.mainServiceService.addServiceImage(
                updateService._id,
                files.image3[0].buffer,
                files.image3[0].originalname,
                files.image3[0].fieldname,
              );
            }

            if (image && image) {
              response.status(201).send({
                statusCode: HttpStatus.OK,
                message: 'MainService Update successfully',
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
          const updateService = await this.mainServiceService.update(
            id,
            mainServiceModel,
          );
          if (updateService) {
            response.status(201).send({
              statusCode: HttpStatus.OK,
              message: 'MainService Update successfully',
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
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const isDelete = await this.mainServiceService.remove(id);
      if (isDelete) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          message: 'MainService Delete successfully',
          data: isDelete,
        });
      }
    } catch (error) {
      console.log(error);
      response.status(401).send(error);
    }
  }

  @Patch('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteMainService(@Param('id') id: string, @Res() response: Response) {
    try {
      const deleteMainService = await this.mainServiceService.deleteMainService(
        id,
      );
      if (deleteMainService) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          message: 'MainService Delete successfully',
          data: deleteMainService,
        });
      }
    } catch (error) {
      console.log(error);
      response.status(401).send(error);
    }
  }
}
