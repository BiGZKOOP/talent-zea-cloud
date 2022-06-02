import { PartialType } from '@nestjs/mapped-types';
import { CreateSubServiceDto } from './create-sub-service.dto';
import { MainService } from '../../main-service/entities/main-service.schema';
import { RequiredPageEntity } from '../../required-page/entities/required-page.schema';

export class UpdateSubServiceDto extends PartialType(CreateSubServiceDto) {
  mainTopic: string;
  subTopic: string;
  description: string;
  price: string;
  mainService: MainService;
  requiredPage: RequiredPageEntity;
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
