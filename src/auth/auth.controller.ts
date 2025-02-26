import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, LoginResponseData } from '../common/response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<ApiResponse<LoginResponseData>> {
    const loginData = await this.authService.login(username, password);
    return {
      status: 201,
      message: 'Request successful',
      data: loginData,
    };
  }
}