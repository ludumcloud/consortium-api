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
    const exponent: number = body.exponent;
    const seed: string = body.seed;
    const width: number = body.width;
    const height: number = body.height;

    const match: Match = await this.matchService.createMatch(participants, { exponent, seed, width, height });
    // We need to fetch the match to make sure we only grab the tiles that pertain to the user
    return this.matchService.findMatch(match.id);
  }

  @Get('/:id')
  public async getMatch (@Param() params): Promise<Match> {
    return this.matchService.findMatch(params.id);
  }
}
