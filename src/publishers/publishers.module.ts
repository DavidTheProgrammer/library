import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';
import { Publisher } from './publisher.model';

@Module({
  imports: [TypegooseModule.forFeature(Publisher)],
  controllers: [PublishersController],
  providers: [PublishersService]
})
export class PublishersModule {}
