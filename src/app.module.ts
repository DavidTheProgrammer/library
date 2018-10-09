import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BaseService } from './shared/services/base.service';
import { AppController } from './app.controller';
import { DB_CONNECTION } from '../connection';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TypegooseModule.forRoot(DB_CONNECTION), UsersModule],
  controllers: [AppController],
  providers: [BaseService]
})
export class AppModule {}
