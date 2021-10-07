import { Injectable } from '@nestjs/common';
import { InjectModel as InjectSchema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User as UserSchemaClass } from '../models/user.schema';
import { UserDTO } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectSchema(UserSchemaClass.name) private userSchema: Model<UserDocument>,
  ) {}

  findAll(): Promise<UserDTO[]> {
    return this.userSchema.find().exec();
  }

  findOne(id: string): Promise<UserDTO> {
    return new Promise(() => {});
  }

  findByEmail(email: string): Promise<UserDTO> {
    return new Promise(() => {});
  }

  create(user: CreateUserDto): Promise<UserDTO> {
    const createUser = new this.userSchema(user);
    return createUser.save();
  }

  update(user: UserDTO): Promise<[number, UserDTO[]]> {
    return new Promise(() => {});
  }
}
