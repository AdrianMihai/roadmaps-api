import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GithubAuthData } from './Types';
import { AuthData, LoginStrategy } from 'src/session/AuthData';
import { UserRepository } from 'src/user/user.repository';
import { ResponseFactory } from 'src/infrastructure/ResponseData';
import { AuthGuard } from './AuthGuard';
import { UserDocument } from 'src/user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get('github-login')
  async onGithubAuthentication(@Query('code') sessionCode, @Req() req: Request, @Res() response: Response) {
    try {
      const authData = await this.authService.getGithubAccessToken(sessionCode);
      const userData = await this.authService.fetchGithubUserData(authData as GithubAuthData);
      const userEntity = await this.userRepository.addUser(userData);

      req.session.userData = userEntity;
      req.session.authData = authData as AuthData;
      req.session.loginStrategy = LoginStrategy.github;

      response.status(200).json(ResponseFactory.createSuccessResponse(userEntity));
    } catch (e) {
      if (!e.code || parseInt(e.code) === 200) {
        response.status(200).json(ResponseFactory.createErrorResponse(e.message));

        return;
      }

      console.log(e.code);
      response.status(parseInt(e.code)).json(e.message);
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() request: Request, @Res() response: Response) {
    response.status(200).json(ResponseFactory.createSuccessResponse(request.session.userData as UserDocument));
  }
}
