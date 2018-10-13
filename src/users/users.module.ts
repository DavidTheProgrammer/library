import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UsersController } from './users.controller';

@Module({
  imports: [TypegooseModule.forFeature(User)],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
