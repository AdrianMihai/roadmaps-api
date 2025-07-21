import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from './goal.schema';
import { GoalsController } from './goals.controller';
import { GoalsRepository } from './goals.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }])],
  controllers: [GoalsController],
  providers: [GoalsRepository],
  exports: []
})
export class GoalsModule {}
