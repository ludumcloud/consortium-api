import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
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
  @UseInterceptors(ClassSerializerInterceptor)
  public async createMatch (@Body() body: CreateMatchRequest): Promise<Match> {
    const participants: number[] = body.participants;

    const match: Match = await this.matchService.createMatch(participants);
    return this.matchService.findMatch(match.id);
  }

  @Get('/:id')
  public async getMatch (@Param() params): Promise<Match> {
    return this.matchService.findMatch(params.id);
  }
}
