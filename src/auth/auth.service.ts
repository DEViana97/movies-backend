import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    console.log('AuthService inicializado com secret:', process.env.JWT_SECRET || 'defaultSecretKey');
  }

  async validateUser(username: string, password: string): Promise<any> {
    console.log('Validando usuário:', username);
    const user = await this.usersService.findOne(username);
    console.log('Usuário encontrado:', user);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Senha corresponde:', passwordMatch);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(username: string, password: string): Promise<{ access_token: string; user: { id: number; username: string } }> {
    console.log('Iniciando login para:', username);
    const user = await this.validateUser(username, password);
    console.log('Usuário validado:', user);

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('Token gerado:', token);

    return {
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}