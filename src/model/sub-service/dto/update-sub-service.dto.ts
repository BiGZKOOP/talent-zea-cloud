import { PartialType } from '@nestjs/mapped-types';
import { CreateSubServiceDto } from './create-sub-service.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { MainService } from '../../main-service/entities/main-service.schema';

export class UpdateSubServiceDto extends PartialType(CreateSubServiceDto) {
  // @IsString()
  // @IsNotEmpty()
  mainTopic: string;
  // @IsString()
  // @IsNotEmpty()
  subTopic: string;
  // @IsString()
  // @IsNotEmpty()
  description: string;
  // @IsString()
  // @IsNotEmpty()
  price: string;
  // @IsString()
  // @IsNotEmpty()
  mainService: MainService;
  image: {
    image1: string;
    image2: string;
    image3: string;
  };
  faq: [
    {
      question: string;
      answers: string;
    },
  ];
  expressDelivery: {
    hide: boolean;
    price: number;
    count: number;
  };

  sourceFiles: {
    hide: boolean;
    price: boolean;
  };

  revisions: {
    hide: boolean;
    price: number;
    count: number;
  };
  orderTopic: string;
  orderDescription: string;
  deliveryTime: string;
}
