import { PartialType } from '@nestjs/mapped-types';
import { CreateRequiredPageDto } from './create-required-page.dto';
import { IsArray } from 'class-validator';

export class UpdateRequiredPageDto extends PartialType(CreateRequiredPageDto) {
  @IsArray()
  meta_data: [
    {
      id: string;
      label: string;
      description?: string;
      placeHolder?: string;
    },
  ];
}
