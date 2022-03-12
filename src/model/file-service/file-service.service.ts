import { Injectable } from '@nestjs/common';
import { CreateFileServiceDto } from './dto/create-file-service.dto';
import { UpdateFileServiceDto } from './dto/update-file-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {
  FileService,
  FileServiceDocument,
} from './entities/file-service.schema';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileServiceService {
  constructor(
    @InjectModel(FileService.name)
    private fileModel: Model<FileServiceDocument>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    // const newFile = this.fileModel.create({
    //   key: uploadResult.Key,
    //   url: uploadResult.Location,
    // });

    const createFile = new this.fileModel({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    return await createFile.save();
  }

  create(createFileServiceDto: CreateFileServiceDto) {
    return 'This action adds a new fileService';
  }

  findAll() {
    return `This action returns all fileService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileService`;
  }

  update(id: number, updateFileServiceDto: UpdateFileServiceDto) {
    return `This action updates a #${id} fileService`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileService`;
  }
}
