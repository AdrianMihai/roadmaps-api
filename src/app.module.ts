import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsModule } from './goals/goals.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/RoadmapsDB'), GoalsModule, AuthModule, ConfigModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
