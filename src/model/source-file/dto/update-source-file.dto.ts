import { PartialType } from '@nestjs/mapped-types';
import { CreateSourceFileDto } from './create-source-file.dto';

export class UpdateSourceFileDto extends PartialType(CreateSourceFileDto) {}
