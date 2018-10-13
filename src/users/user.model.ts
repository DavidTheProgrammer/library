import { prop, arrayProp, instanceMethod, InstanceType } from 'typegoose';
import { IsString, IsArray } from 'class-validator';
import { DateTime } from 'luxon';

import { BaseModel } from '../shared/base.model';
import { Genres } from '../shared/genres';

export class User extends BaseModel {
  @IsString()
  @prop({ required: true })
  firstName?: string;

  @IsString()
  @prop({ required: true })
  lastName?: string;

  @IsArray()
  @arrayProp({ items: String, enum: Genres })
  genres?: Genres[];

  @instanceMethod
  addGenre(
    this: InstanceType<User>,
    genreToAdd: Genres,
    save = false
  ): Promise<InstanceType<User>> {
    this.genres.push(genreToAdd);

    if (save) {
      return this.save();
    }
  }

  @instanceMethod
  removeGenre(
    this: InstanceType<User>,
    genreToRemove: Genres,
    save = false
  ): Promise<InstanceType<User>> {
    this.genres = this.genres.filter(genre => genre !== genreToRemove);

    if (save) {
      return this.save();
    }
  }

  @instanceMethod
  setUpdatedAtTimeToNow(this: InstanceType<User>, save = false): Promise<InstanceType<User>> {
    this.updatedAt = DateTime.utc().toJSDate();

    if (save) {
      return this.save();
    }
  }
}
