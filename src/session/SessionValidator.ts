import { SessionData } from 'express-session';
import { isNullOrUndefined } from 'src/utils/CommonUtils';

export const validateRequestSession = (sessionData: SessionData) => !isNullOrUndefined(sessionData.loginStrategy);
