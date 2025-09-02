import 'express-session';
import { UserData } from 'src/user/UserData';
import { AuthData, LoginStrategy } from './AuthData';

declare module 'express-session' {
  interface SessionData {
    cookie?: Cookie;
    authData: AuthData;
    userData: UserData;
    loginStrategy: LoginStrategy;
  }
}
