import { Injectable } from '@nestjs/common';
import { InstanceType, ModelType } from 'typegoose';
import { Types } from 'mongoose';

/**
 * This is the base service that will deal with all the basic interaction with the Database.
 */
@Injectable()
export class BaseService<T> {
  protected _model: ModelType<T>;

  private _toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }

  protected async create(item: InstanceType<T>): Promise<InstanceType<T>> {
    return this._model.create(item);
  }

  async findAll(filter = {}): Promise<InstanceType<T>[]> {
    return this._model.find(filter).exec();
  }

  async findById(id: string): Promise<InstanceType<T>> {
    const objectId = this._toObjectId(id);
    return this._model.findById(objectId);
  }

  async delete(id: string): Promise<InstanceType<T>> {
    const objectId = this._toObjectId(id);
    return this._model.findByIdAndDelete(objectId);
  }

  async update(id: string, item: Partial<InstanceType<T>>): Promise<InstanceType<T>> {
    const objectId = this._toObjectId(id);
    return this._model.findByIdAndUpdate(objectId, item, { new: true }).exec();
  }
}
