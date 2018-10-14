import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BaseService } from './shared/base.service';
import { AppController } from './app.controller';
import { Connection } from './database/connection';
import { UsersModule } from './users/users.module';
import { PublishersModule } from './publishers/publishers.module';

@Module({
  imports: [
    TypegooseModule.forRoot(new Connection().local, { useNewUrlParser: true }),
    UsersModule,
    PublishersModule
  ],
  controllers: [AppController],
  providers: [BaseService]
})
export class AppModule {}
