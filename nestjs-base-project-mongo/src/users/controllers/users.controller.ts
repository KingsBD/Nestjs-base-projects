import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDTO } from '../dtos/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.findOne({ _id: id });
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<{ id: string }> {
    const id = await this.userService.create(user);
    return { id };
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UserDTO): Promise<void> {
    user.id = id;
    return this.userService.update(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
