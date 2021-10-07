import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { UserSchema, User as UserSchemaClass } from './models/user.schema';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserDao } from './dao/user.dao';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserDao],
  exports: [UsersService, UserDao],
})
export class UsersModule {}
