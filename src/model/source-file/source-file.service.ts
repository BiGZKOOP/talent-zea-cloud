import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSourceFileDto } from './dto/create-source-file.dto';
import { UpdateSourceFileDto } from './dto/update-source-file.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SourceFile, SourceFileDocument } from './entities/source-file.schema';
import { Model } from 'mongoose';

@Injectable()
export class SourceFileService {
  @InjectModel(SourceFile.name)
  private sourceFileModel: Model<SourceFileDocument>;

  async create(createSourceFileDto: CreateSourceFileDto) {
    try {
      const sourceFile = new this.sourceFileModel(createSourceFileDto);
      const file = await sourceFile.save();
      if (file) {
        return file;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all sourceFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sourceFile`;
  }

  async getSourceFileByOrderID(id: string) {
    try {
      const file = await this.sourceFileModel
        .find({ orderID: id })
        .populate('orderID');
      if (!file) {
        throw new NotFoundException();
      }
      return file;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: string, updateSourceFileDto: UpdateSourceFileDto) {
    return this.sourceFileModel
      .findOneAndUpdate({ _id: id }, updateSourceFileDto)
      .setOptions({ new: true });
  }

  remove(id: string) {
    return this.sourceFileModel.deleteOne({ _id: id });
  }
}
