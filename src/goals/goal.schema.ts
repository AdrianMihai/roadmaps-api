import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GoalPriority } from 'src/models/Goal';
import { SubGoal } from 'src/models/SubGoal';

@Schema()
export class Goal {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true })
  text: string;

  @Prop({
    enum: {
      values: Object.values(GoalPriority),
      message: 'Priority {VALUE} is not supported',
    },
  })
  priority: string;

  @Prop()
  dueBy: string;

  @Prop([SubGoal])
  subGoals: SubGoal[];

  @Prop()
  roadmapAnalysis?: string;
}

export type GoalDocument = HydratedDocument<Goal>;

export const GoalSchema = SchemaFactory.createForClass(Goal);
