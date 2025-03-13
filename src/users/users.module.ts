import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => AuthModule)
],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Exporta o serviço para uso em outros módulos
})
export class UsersModule {}