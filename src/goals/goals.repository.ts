import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoalDefaultData } from 'src/models/Goal';
import { SubGoal } from 'src/models/SubGoal';
import { Goal } from './goal.schema';
import { GoalUpdateData } from './goalValidator';

@Injectable()
export class GoalsRepository {
  constructor(@InjectModel(Goal.name) private goalModel: Model<Goal>) {}

  findAll(): Promise<Goal[]> {
    return this.goalModel.find().exec();
  }

  createDefaultGoal(goalData: GoalDefaultData) {
    const goal = new this.goalModel(goalData);

    return goal.save();
  }

  deleteGoal(goalId: string) {
    return this.goalModel.findOneAndDelete({ id: goalId }).exec();
  }

  updateGoal(goalId: string, updateData: GoalUpdateData) {
    return this.goalModel.findOneAndUpdate({ id: goalId }, updateData, { returnDocument: 'after' }).exec();
  }

  async addSubGoal(goalId: string, subGoal: SubGoal) {
    const parentGoal = await this.goalModel.findOne({ id: goalId }).exec();

    if (!parentGoal) {
      throw new Error('No parent goal found.');
    }

    parentGoal.subGoals.push(subGoal);

    return parentGoal.save();
  }
}
