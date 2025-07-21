import { SubGoal } from "./SubGoal";

export enum GoalPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export type GoalDefaultData = {
  id: string;
  text: string;
  priority: GoalPriority;
  dueBy?: string;
  subGoals?: SubGoal[]
}
