import { isBool } from 'src/utils/CommonUtils';
import { isEmptyString } from 'src/utils/StringUtils';

export class SubGoal {
  id: string;
  text: string;
  isCompleted?: boolean;
}

export const createSubGoal = (data: Record<string, any>): SubGoal => {
  if (isEmptyString(data.id)) {
    throw new Error('Missing sub-goal id.');
  }

  if (isEmptyString(data.text)) {
    throw new Error('Missing sub-goal text.');
  }

  return {
    id: data.id,
    text: data.text,
    isCompleted: isBool(data.isCompleted) ? data.isCompleted : false,
  };
};
