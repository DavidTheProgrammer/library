import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';

@Module({
  imports: [
    TypegooseModule.forFeature({
      typegooseClass: User,
      schemaOptions: {
        timestamps: true
      }
    })
  ],
  providers: [UsersService]
})
export class UsersModule {}
