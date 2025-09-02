import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GithubAuthData } from './Types';
import { AuthData, LoginStrategy } from 'src/session/AuthData';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github-login')
  async onGithubAuthentication(@Query('code') sessionCode, @Req() req: Request, @Res() response: Response) {
    try {
      const authData = await this.authService.getGithubAccessToken(sessionCode);
      const userData = (await this.authService.fetchGithubUserData(authData as GithubAuthData)) as any;

      req.session.authData = authData as AuthData;
      req.session.userData = userData;
      req.session.loginStrategy = LoginStrategy.github;

      response.status(200).json(userData);
    } catch (e) {
      console.log(e.message);
      response.status(parseInt(e.code ?? 400)).json(e.message);
    }
  }
}
