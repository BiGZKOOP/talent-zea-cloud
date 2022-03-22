import { PartialType } from '@nestjs/mapped-types';
import { CreateMainServiceDto } from './create-main-service.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMainServiceDto extends PartialType(CreateMainServiceDto) {
  @IsString()
  @IsNotEmpty()
  mainTopic: string;
  @IsString()
  @IsNotEmpty()
  mainTopicDescription: string;
  image: {
    image1: string;
    image2: string;
    image3: string;
  };
}
