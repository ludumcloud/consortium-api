import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import Match from '../models/Match';
import { CreateMatchRequest } from '../schemas';
import MatchService from '../services/MatchService';

@Controller('/v1/match')
export default class MatchController {
  private readonly matchService: MatchService;

  constructor (matchService: MatchService) {
    this.matchService = matchService;
  }

  @Post()
  public async createMatch (@Body() body: CreateMatchRequest): Promise<any> {
    const participants: number[] = body.participants;

    return this.matchService.createMatch(participants);
  }

  @Get('/:id')
  public async getMatch (@Param() params): Promise<Match> {
    return this.matchService.fetchMatch(params.id);
  }
}
