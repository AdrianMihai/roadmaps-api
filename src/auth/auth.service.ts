import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { GithubAuthData } from './Types';
import { catchError, of } from 'rxjs';
import { UserData } from 'src/user/UserData';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getGithubAccessToken(sessionCode: string) {
    return new Promise((resolve) => {
      this.httpService
        .get('https://github.com/login/oauth/access_token', {
          params: {
            client_id: this.configService.get('GITHUB_AUTH_CLIENTID'),
            client_secret: this.configService.get('GITHUB_AUTH_SECRET'),
            code: sessionCode,
          },
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        })
        .subscribe((resp) => resolve(resp.data));
    });
  }

  getGithubUser(authData: GithubAuthData) {
    return new Promise((resolve) => {
      this.httpService
        .request({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `${authData.token_type} ${authData.access_token}`,
            x_oauth_scopes: authData.scope,
          },
        })
        .pipe(catchError((err) => of(err.response)))
        .subscribe((resp) => {
          resolve(resp.data);
        });
    });
  }

  getGithubEmails(authData: GithubAuthData) {
    return new Promise((resolve) => {
      this.httpService
        .request({
          method: 'GET',
          url: 'https://api.github.com/user/emails',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `${authData.token_type} ${authData.access_token}`,
            x_oauth_scopes: authData.scope,
          },
        })
        .pipe(catchError((err) => of(err.response)))
        .subscribe((resp) => {
          resolve(resp.data);
        });
    });
  }

  async fetchGithubUserData(authData: GithubAuthData): Promise<UserData> {
    const userResponse: any = await this.getGithubUser(authData);

    if (!userResponse.login && !userResponse.email) {
      throw new AxiosError('Github requires re-authentication.', userResponse.status);
    }

    const result = { username: userResponse.login, email: userResponse.email };

    if (!result.email) {
      const emails: any = await this.getGithubEmails(authData);

      result.email = emails[0].email;
    }

    return result;
  }
}
