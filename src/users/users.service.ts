import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> { // Mude de undefined para null
    console.log('findOne chamado com username:', username);
    const user = await this.usersRepository.findOneBy({ username });
    console.log('findOne resultado:', user);
    return user;
  }

  async create(username: string, password: string): Promise<User> {
    const existingUser = await this.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Senha hasheada:', hashedPassword);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }
}