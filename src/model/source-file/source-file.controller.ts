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
  NotFoundException,
} from '@nestjs/common';
import { SourceFileService } from './source-file.service';
import { CreateSourceFileDto } from './dto/create-source-file.dto';
import { UpdateSourceFileDto } from './dto/update-source-file.dto';
import { Response } from 'express';
import * as Joi from '@hapi/joi';

@Controller('source-file')
export class SourceFileController {
  constructor(private readonly sourceFileService: SourceFileService) {}

  @Post()
  async create(
    @Body() createSourceFileDto: CreateSourceFileDto,
    @Res() response: Response,
  ) {
    const schema = Joi.object({
      orderID: Joi.string().required(),
      description: Joi.string().required(),
      sourceFile: Joi.string().required(),
    });
    const validation = schema.validate(createSourceFileDto);
    if (validation.error) {
      response.status(401).send(validation.error);
    } else {
      try {
        const sourceFileMadel: CreateSourceFileDto = validation.value;
        const sourceFile = await this.sourceFileService.create(sourceFileMadel);
        if (sourceFile) {
          response.status(201).send({
            statusCode: HttpStatus.OK,
            message: 'Source File Created',
            data: sourceFile,
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
    return this.sourceFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceFileService.findOne(+id);
  }

  @Get('file/:id')
  async getSourceFileByOrderID(@Param('id') id: string) {
    try {
      const file = await this.sourceFileService.getSourceFileByOrderID(id);
      if (file) {
        return file;
      }
      throw new NotFoundException();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSourceFileDto: UpdateSourceFileDto,
  ) {
    return await this.sourceFileService.update(id, updateSourceFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceFileService.remove(id);
  }
}
