import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserDao } from './dao/user.dao';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserDao],
  exports: [UsersService],
})
export class UsersModule {}
