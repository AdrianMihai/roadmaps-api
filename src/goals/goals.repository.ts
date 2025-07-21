import { Injectable } from '@nestjs/common';
import { Goal } from './goal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoalDefaultData } from 'src/models/Goal';

@Injectable()
export class GoalsRepository {
  constructor(@InjectModel(Goal.name) private goalModel: Model<Goal>) {}

  findAll(): Promise<Goal[]> {
    return this.goalModel.find().exec();
  }

  createDefaultGoal(goalData: GoalDefaultData) {
    const goal = new this.goalModel(goalData);

    return goal.save()
  }
}
