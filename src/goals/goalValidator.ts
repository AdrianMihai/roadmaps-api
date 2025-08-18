import { GoalPriority } from 'src/models/Goal';
import { isEmptyString } from 'src/utils/StringUtils';

export type GoalUpdateData = {
  roadmapAnalysis?: string;
  priority?: GoalPriority;
  dueBy?: string;
};

export const getGoalUpdateData = (data: Record<string, any>): GoalUpdateData => {
  if (isEmptyString(data.roadmapAnalysis) && isEmptyString(data.priority) && isEmptyString(data.dueBy)) {
    throw new Error('Missing data for updating the goal.');
  }

  return {
    roadmapAnalysis: data.roadmapAnalysis,
    priority: data.priority,
    dueBy: data.dueBy,
  };
};
