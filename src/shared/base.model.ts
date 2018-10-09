import { Typegoose, prop } from 'typegoose';
import { DateTime } from 'luxon';

export class BaseModel extends Typegoose {
  @prop({
    default: DateTime.utc().toJSDate()
  })
  createdAt?: Date;

  @prop({
    default: DateTime.utc().toJSDate()
  })
  updatedAt?: Date;
}
