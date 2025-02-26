import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    const secretOrKey = process.env.JWT_SECRET;
    if (!secretOrKey) {
      throw new Error('JWT_SECRET não definido no JwtStrategy');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretOrKey,
    });
    console.log('JWT_SECRET no JwtStrategy:', process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não definido no JwtStrategy');
    }
  }

  async validate(payload: any) {
    console.log('Validando payload:', payload);
    const user = await this.usersService.findOne(payload.username);
    console.log('Resultado do findOne:', user);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    console.log('Usuário validado:', user);
    return { id: user.id, username: user.username };
  }
}