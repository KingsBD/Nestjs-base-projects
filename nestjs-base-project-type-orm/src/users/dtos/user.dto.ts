import { ApiTags } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@ApiTags()
export class UserDTO extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  id?: string;
}
