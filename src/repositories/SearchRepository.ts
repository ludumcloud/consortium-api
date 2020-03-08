import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class SearchRepository {
  private readonly client: Client;

  constructor (config: ConfigService) {
    const url: string = config.get('ELASTIC_URL');
    if (!url) {
      throw new Error('Cannot construct SearchRepository without elastic url');
    }

    this.client = new Client({ node: url });
  }

  public async search<T> (index: string, query: Record<string, any>): Promise<T[]> {
    const { body } = await this.client.search({
      index,
      body: {
        query
      }
    });

    const results: T[] = body?.hits?.hits?.map((result): Record<string, string> => {
      return result._source;
    });
    return results ?? [];
  }

  public async addToIndex (index: string, body: Record<string, any>): Promise<void> {
    await this.client.index({
      index,
      body
    });
  }

  public async refreshIndex (index: string): Promise<void> {
    await this.client.indices.refresh({ index });
  }
}
