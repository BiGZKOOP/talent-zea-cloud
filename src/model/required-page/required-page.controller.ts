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
import { RequiredPageService } from './required-page.service';
import { CreateRequiredPageDto } from './dto/create-required-page.dto';
import { UpdateRequiredPageDto } from './dto/update-required-page.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';

@Controller('required-page')
export class RequiredPageController {
  constructor(private readonly requiredPageService: RequiredPageService) {}

  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createRequiredPageDto: CreateRequiredPageDto,
    @Res() response: Response,
  ) {
    const schema = Joi.object({
      meta_data: Joi.array().items(Joi.object()).required(),
    });
    const validation = schema.validate(createRequiredPageDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      try {
        const reqModel: CreateRequiredPageDto = validation.value;
        const reqPage = await this.requiredPageService.create(reqModel, id);
        if (reqPage) {
          response.status(201).send({
            statusCode: HttpStatus.OK,
            message: 'ReqPage is created',
            data: reqPage,
          });
        }
      } catch (error) {
        console.log(error);
        response.status(401).send(error);
      }
    }
  }

  @Get()
  findAll() {
    return this.requiredPageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requiredPageService.findOne(+id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateRequiredPageDto: UpdateRequiredPageDto,
    @Res() response: Response,
  ) {
    try {
      const reqPage = await this.requiredPageService.update(
        id,
        updateRequiredPageDto,
      );
      if (reqPage) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          message: 'ReqPage is updated',
          data: reqPage,
        });
      }
    } catch (error) {
      console.log();
      response.status(401).send(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requiredPageService.remove(+id);
  }
}
