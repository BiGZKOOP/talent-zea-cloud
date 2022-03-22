import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMainServiceDto {
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
