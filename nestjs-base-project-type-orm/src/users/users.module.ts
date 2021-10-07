import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User } from './models/user.model';
// import { UserSchema, User as UserSchemaClass } from './models/user.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserDao } from './dao/user-type-orm.dao';

@Module({
  imports: [
    // SequelizeModule.forFeature([User]),
    // MongooseModule.forFeature([
    //   { name: UserSchemaClass.name, schema: UserSchema },
    // ]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserDao],
  exports: [UsersService, UserDao],
})
export class UsersModule {}
