import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Remove fallback
      signOptions: { expiresIn: '1h' },
      secretOrPrivateKey: 'process.env.JWT_SECRET',
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
  constructor() {
    console.log('JWT_SECRET no JwtModule:', process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não definido no JwtModule');
    }
  }
}