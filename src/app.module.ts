import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/RoadmapsDB'), GoalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
