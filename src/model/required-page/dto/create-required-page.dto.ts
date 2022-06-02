import { IsArray, IsNotEmpty } from 'class-validator';

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
}
