import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserDTO extends PartialType(CreateUserDto) {
  id?: string;
}
