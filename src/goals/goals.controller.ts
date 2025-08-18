import { Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createSubGoal } from 'src/models/SubGoal';
import { GoalsRepository } from './goals.repository';
import { getGoalUpdateData } from './goalValidator';

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

  @Delete(':goalId')
  async deleteGoal(@Param() params: any, @Res() response: Response) {
    if (!params.goalId) {
      return response.status(400).send('Missing goal id.');
    }

    const result = await this.goalsRepository.deleteGoal(params.goalId);

    return response.status(200).send(result);
  }

  @Put(':goalId')
  async updateGoal(@Param() params: any, @Res() response: Response, @Req() request: Request) {
    if (!params.goalId) {
      return response.status(400).send('Missing goal id.');
    }

    try {
      const resultingGoal = await this.goalsRepository.updateGoal(params.goalId, getGoalUpdateData(request.body));

      response.status(200).send(resultingGoal);
    } catch (e) {
      response.status(400).send(e.message);
    }
  }

  @Post(':goalId/add-subGoal')
  async addSubGoal(@Param() params: any, @Res() response: Response, @Req() request: Request) {
    if (!params.goalId) {
      return response.status(400).send('Missing goal id.');
    }

    try {
      const resultingGoal = await this.goalsRepository.addSubGoal(params.goalId, createSubGoal(request.body));

      response.status(200).send(resultingGoal);
    } catch (e) {
      return response.status(400).send(e.message);
    }
  }
}
