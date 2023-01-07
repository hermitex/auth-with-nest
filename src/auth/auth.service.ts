import { UsersService } from './../users/users.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (!user) return null;
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('Could not find the user!');
    }

    if (user && isValidPassword) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };

    return {
      access_tokek: this.jwtService.sign(payload),
    };
  }
}
