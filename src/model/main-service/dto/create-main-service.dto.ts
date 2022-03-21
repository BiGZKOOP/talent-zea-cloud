import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMainServiceDto {
  @IsString()
  @IsNotEmpty()
  mainTopic: string;
  @IsString()
  @IsNotEmpty()
  subTopic: string;
}
