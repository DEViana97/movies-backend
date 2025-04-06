import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './filme.entity';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private filmesRepository: Repository<Filme>,
  ) {}

  async findAll(status?: boolean): Promise<Filme[]> {
    const whereClause = status !== undefined ? { status } : {};
    return this.filmesRepository.find({ where: whereClause });
  }

  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    const filme = this.filmesRepository.create(createFilmeDto);
    // Status será false por padrão devido à entidade
    return this.filmesRepository.save(filme);
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto): Promise<Filme> {
    const filme = await this.filmesRepository.findOne({ where: { id } });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado`);
    }
    Object.assign(filme, updateFilmeDto);
    return this.filmesRepository.save(filme);
  }
}