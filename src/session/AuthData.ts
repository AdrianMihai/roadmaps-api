import { GithubAuthData } from 'src/auth/Types';

export type AuthData = GithubAuthData;

export enum LoginStrategy {
  github = 'github',
}
