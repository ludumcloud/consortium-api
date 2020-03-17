import { Injectable,  } from '@nestjs/common';
import { FindOneOptions, getRepository, Repository } from 'typeorm';
import User from '../models/User';

type UserFields = Array<Extract<keyof User, string>>;
const DEFAULT_FIELDS: UserFields = [ 'id', 'username', 'name'];

@Injectable()
export default class UserRepository {
  private readonly repository: Repository<User>;

  constructor () {
    this.repository = getRepository(User);
  }

  public async createUser (email: string, username: string, salt: string, hashedPassword: string, name: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.username = username;
    user.salt = salt;
    user.password = hashedPassword;
    user.name = name;

    return this.repository.save(user);
  }

  public async findByEmail (email: string, fields?: UserFields): Promise<User> {
    const options: FindOneOptions = {};
    if (fields) {
      options.select = DEFAULT_FIELDS.concat(fields);
    }

    return this.repository.findOne({ email }, options);
  }

  public async fetchUserById (id: number): Promise<User> {
    return this.repository.findOne({ id });
  }

  public async fetchUsersById (ids: number[]): Promise<User[]> {
    return this.repository.findByIds(ids);
  }
}
