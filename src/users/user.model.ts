import { prop, arrayProp, instanceMethod, InstanceType } from 'typegoose';
import { IsString, IsArray } from 'class-validator';

import { BaseModel } from 'shared/base.model';
import { Genre } from 'shared/genres';

export class User extends BaseModel {
  @IsString()
  @prop({ required: true })
  firstName?: string;

  @IsString()
  @prop({ required: true })
  lastName?: string;

  @IsArray()
  @arrayProp({ items: Genre })
  genres?: Genre[];

  @instanceMethod
  addGenre(this: InstanceType<User>, genreToAdd: Genre) {
    this.genres.push(genreToAdd);
    return this.save();
  }

  @instanceMethod
  removeGenre(this: InstanceType<User>, genreToRemove: Genre) {
    this.genres = this.genres.filter(genre => genre !== genreToRemove);
    return this.save();
  }
}
