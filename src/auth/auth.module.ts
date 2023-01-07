import { PrismaModule } from './../prisma/prisma.module';
import { UsersService } from './../users/users.service';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './user.auth';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
