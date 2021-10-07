import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '../models/user.entity';
import { UserDTO } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  findAll(): Promise<UserDTO[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<UserDTO> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<UserDTO> {
    return this.usersRepository.findOne({ email });
  }

  create(user: CreateUserDto): Promise<UserDTO> {
    return this.usersRepository.save(new User(user));
  }

  async update(user: UserDTO): Promise<[number, UserDTO[]]> {
    const { id, ...rest } = user;
    const dbUser = await this.findOne(id);
    const count = dbUser ? 1 : 0;
    if (dbUser) await this.usersRepository.update(id, rest);
    return [count, [user]];
  }
}
