import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    console.log(hashedPassword);
    createUserDto.password = hashedPassword;
    const user = await this.usersService.createUser(createUserDto);
    return user;
  }
}
