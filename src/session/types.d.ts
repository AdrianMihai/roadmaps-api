import 'express-session';
import { AuthData, LoginStrategy } from './AuthData';
import { UserDocument } from 'src/user/user.schema';

declare module 'express-session' {
  interface SessionData {
    cookie?: Cookie;
    authData: AuthData;
    userData: UserDocument;
    loginStrategy: LoginStrategy;
  }
}
