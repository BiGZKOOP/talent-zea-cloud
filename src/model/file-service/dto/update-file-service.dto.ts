import { PartialType } from '@nestjs/mapped-types';
import { CreateFileServiceDto } from './create-file-service.dto';

export class UpdateFileServiceDto extends PartialType(CreateFileServiceDto) {}
