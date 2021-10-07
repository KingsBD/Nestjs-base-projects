import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectModel as InjectSchema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel } from '../models/user.model';
import { UserDocument, User as UserSchemaClass } from '../models/user.schema';
import { UserDTO } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
    @InjectSchema(UserSchemaClass.name) private userSchema: Model<UserDocument>,
  ) {}

  findAll(): Promise<UserDTO[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<UserDTO> {
    return this.userModel.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<UserDTO> {
    return this.userModel.findOne({ where: { email }, raw: true });
  }

  create(user: CreateUserDto): Promise<UserDTO> {
    return this.userModel.create(user);
  }

  update(user: UserDTO): Promise<[number, UserDTO[]]> {
    const { id, ...rest } = user;
    return this.userModel.update(rest, { where: { id } });
  }

  createNSQL(createUserDto: CreateUserDto): Promise<UserSchemaClass> {
    const createUser = new this.userSchema(createUserDto);
    return createUser.save();
  }

  findAllNSQL(): Promise<UserSchemaClass[]> {
    return this.userSchema.find().exec();
  }
}
