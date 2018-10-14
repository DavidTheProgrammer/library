import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { BaseService } from '../shared/base.service';
import { Publisher } from './publisher.model';
import { CreatePublisherDto } from './create-publisher.dto';

@Injectable()
export class PublishersService extends BaseService<Publisher> {
  constructor(@InjectModel(Publisher) private readonly _publisherModel: ModelType<Publisher>) {
    super();
    this._model = _publisherModel;
  }

  async createPublisher(publisher: CreatePublisherDto): Promise<Publisher> {
    const { displayName, address } = publisher;
    const newPublisher = new this._model();

    newPublisher.displayName = displayName;
    newPublisher.address = address;

    return await this.create(newPublisher);
  }

  async updatePublisher(id: string, data: Partial<CreatePublisherDto>): Promise<Publisher> {
    const publisher = await this.findById(id);

    // If the value of the data propertie is undefined, delete the key x value from data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (!value) {
          delete data[key];
        }
      }
    }

    if (!publisher) {
      throw new HttpException(`No publisher found with ID [${id}]`, HttpStatus.NOT_FOUND);
    }

    return this.update(id, data);
  }
}
