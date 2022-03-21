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
} from '@nestjs/common';
import { MainServiceService } from './main-service.service';
import { CreateMainServiceDto } from './dto/create-main-service.dto';
import { UpdateMainServiceDto } from './dto/update-main-service.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';

@Controller('main-service')
export class MainServiceController {
  constructor(private readonly mainServiceService: MainServiceService) {}

  @Post()
  async create(
    @Body() createMainServiceDto: CreateMainServiceDto,
    @Res() response: Response,
  ) {
    const schema = Joi.object({
      mainTopic: Joi.string().required(),
      subTopic: Joi.string().required(),
    });
    const validation = schema.validate(createMainServiceDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      const mainServiceModel: CreateMainServiceDto = validation.value;
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

  @Get()
  async findAll() {
    return await this.mainServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const singleData = await this.mainServiceService.findOne(id);
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
  async update(
    @Param('id') id: string,
    @Body() updateMainServiceDto: UpdateMainServiceDto,
    @Res() response: Response,
  ) {
    const schema = Joi.object({
      mainTopic: Joi.string().required(),
      subTopic: Joi.string().required(),
    });
    const validation = schema.validate(updateMainServiceDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      const mainServiceModel: UpdateMainServiceDto = validation.value;
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

  @Delete(':id')
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
}
