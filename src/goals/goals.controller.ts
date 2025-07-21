import { Controller, Get, Post, Req } from '@nestjs/common';
import { GoalsRepository } from './goals.repository';
import { Request } from 'express';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsRepository: GoalsRepository) {}

  @Get()
  findAll() {
    return this.goalsRepository.findAll();
  }

  @Post()
  async insertGoal(@Req() request: Request) {
    const goal = await this.goalsRepository.createDefaultGoal(request.body);

    return goal;
  }
}
