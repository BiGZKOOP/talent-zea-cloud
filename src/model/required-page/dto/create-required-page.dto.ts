import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequiredPageDto {
  @IsArray()
  @IsNotEmpty()
  meta_data: [
    {
      id: string;
      label: string;
      description?: string;
      placeHolder?: string;
    },
  ];
  @IsString()
  @IsNotEmpty()
  type: string;
}
