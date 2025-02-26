import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    console.log('JwtAuthGuard canActivate chamado, token:', token);

    const result = (await super.canActivate(context)) as boolean;
    console.log('Resultado do canActivate:', result);
    return result;
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('handleRequest chamado, err:', err, 'user:', user, 'info:', info);
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido ou ausente');
    }
    return user;
  }
}