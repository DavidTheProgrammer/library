import { prop } from 'typegoose';
import { IsString } from 'class-validator';

import { BaseModel } from '../shared/base.model';

export class Publisher extends BaseModel {
  @IsString()
  @prop({ required: true })
  displayName?: string;

  @IsString()
  @prop()
  address?: string;
}
