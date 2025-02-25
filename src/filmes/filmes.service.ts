import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './filme.entity';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private filmesRepository: Repository<Filme>,
  ) {}

  findAll(): Promise<Filme[]> {
    return this.filmesRepository.find();
  }

  async create(nome: string, imagem: string | null, status: boolean): Promise<Filme> {
    const filme = this.filmesRepository.create({ nome, imagem, status });
    return this.filmesRepository.save(filme);
  }
}