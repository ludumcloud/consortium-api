import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import User from '../models/User';

@Injectable()
export default class UserRepository {
  private readonly repository: Repository<User>;

  constructor () {
    this.repository = getRepository(User);
  }

  async findByEmail (email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async createUser (email: string, username: string, salt: string, hashedPassword: string, name: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.username = username;
    user.salt = salt;
    user.password = hashedPassword;
    user.name = name;

    return this.repository.save(user);
  }
}
