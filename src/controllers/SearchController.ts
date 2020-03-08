import { Controller, Get, Query } from '@nestjs/common';
import { FindUserRequest } from '../schemas';
import { SearchService } from '../services';
import { ElasticUserModel } from '../services/SearchService';

@Controller('/v1/search')
export default class SearchController {
  private readonly searchService: SearchService;

  constructor (searchService: SearchService) {
    this.searchService = searchService;
  }

  @Get('/users')
  async findUser (@Query() params: FindUserRequest): Promise<ElasticUserModel[]> {
   return this.searchService.searchUserByUsername(params.query);
  }
}
