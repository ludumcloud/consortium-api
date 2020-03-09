import { Injectable } from '@nestjs/common';
import User from '../models/User';
import { SearchRepository } from '../repositories';

export interface ElasticUserModel {
  id: number;
  name: string;
  username: string;
}

@Injectable()
export default class SearchService {
  private readonly searchRepository: SearchRepository;

  constructor (searchRepository: SearchRepository) {
    this.searchRepository = searchRepository;
  }

  public async addUserToIndex (user: User): Promise<void> {
    await this.searchRepository.addToIndex('user', {
      id: user.id,
      name: user.name,
      username: user.username
    });
    await this.searchRepository.refreshIndex('user');
  }

  public async searchUserByUsername (input: string): Promise<ElasticUserModel[]> {
    return this.searchRepository.search<ElasticUserModel>('user', {
      bool: {
        should: [
          {
            fuzzy: {
              username: {
                value: input
              }
            }
          },
          {
            prefix: {
              username: input
            }
          }
        ]
      }
    });
  }
}
