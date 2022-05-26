import { Module } from '@nestjs/common';
import { SourceFileService } from './source-file.service';
import { SourceFileController } from './source-file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SourceFile, SourceFileSchema } from './entities/source-file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SourceFile.name, schema: SourceFileSchema },
    ]),
  ],
  controllers: [SourceFileController],
  providers: [SourceFileService],
  exports: [SourceFileService],
})
export class SourceFileModule {}
