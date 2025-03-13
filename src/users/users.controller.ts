import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiResponse } from '../common/response.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<ApiResponse<User>> {
    const user = await this.usersService.create(username, password);
    return {
      status: 201,
      message: 'Request successful',
      data: user,
    };
  }
}