import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './filme.entity';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private filmesRepository: Repository<Filme>,
  ) {}

  findAll(status?: boolean): Promise<Filme[]> {
    const whereClause = status !== undefined ? { status } : {};
    return this.filmesRepository.find({ where: whereClause });
  }

  async findOne(id: number): Promise<Filme> {
    const filme = await this.filmesRepository.findOneBy({ id });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado`);
    }
    return filme;
  }

  async create(name: string, image: string | null, status: boolean): Promise<Filme> {
    const filme = this.filmesRepository.create({ name, image, status });
    return this.filmesRepository.save(filme);
  }

  async update(id: number, name: string, image: string | null, status: boolean): Promise<Filme> {
    const filme = await this.findOne(id); // Reusa findOne para verificar existência
    filme.name = name || filme.name; // Atualiza apenas se fornecido
    filme.image = image !== null ? image : filme.image; // Mantém a image atual se null
    filme.status = status !== undefined ? status : filme.status; // Mantém o status atual se não fornecido
    return this.filmesRepository.save(filme);
  }

  async remove(id: number): Promise<void> {
    const filme = await this.findOne(id); // Verifica existência antes de remover
    await this.filmesRepository.remove(filme);
  }
}