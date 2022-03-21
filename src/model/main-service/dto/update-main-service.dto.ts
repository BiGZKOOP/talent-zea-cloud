import { PartialType } from '@nestjs/mapped-types';
import { CreateMainServiceDto } from './create-main-service.dto';
import { IsString } from 'class-validator';

export class UpdateMainServiceDto extends PartialType(CreateMainServiceDto) {
  @IsString()
  mainTopic: string;
  @IsString()
  subTopic: string;
}
