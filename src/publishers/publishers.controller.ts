import { Controller, Post, Body, Patch, Get } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { Publisher } from './publisher.model';
import { CreatePublisherDto } from './create-publisher.dto';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly _publisherService: PublishersService) {}

  @Get()
  async getPublishers(): Promise<Publisher[] | null> {
    return this._publisherService.findAll();
  }

  @Post()
  async createPublisher(@Body() body: CreatePublisherDto): Promise<Publisher> {
    return this._publisherService.createPublisher(body);
  }

  @Patch()
  async updatePublisher(@Body()
  body: {
    id: string;
    displayName?: string;
    address?: string;
  }): Promise<Publisher> {
    const details: CreatePublisherDto = {
      displayName: body.displayName,
      address: body.address
    };
    return this._publisherService.updatePublisher(body.id, details);
  }
}
