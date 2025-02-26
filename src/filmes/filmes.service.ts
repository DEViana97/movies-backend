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

  findAll(): Promise<Filme[]> {
    return this.filmesRepository.find();
  }

  async findOne(id: number): Promise<Filme> {
    const filme = await this.filmesRepository.findOneBy({ id });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado`);
    }
    return filme;
  }

  async create(nome: string, imagem: string | null, status: boolean): Promise<Filme> {
    const filme = this.filmesRepository.create({ nome, imagem, status });
    return this.filmesRepository.save(filme);
  }

  async update(id: number, nome: string, imagem: string | null, status: boolean): Promise<Filme> {
    const filme = await this.findOne(id); // Reusa findOne para verificar existência
    filme.nome = nome || filme.nome; // Atualiza apenas se fornecido
    filme.imagem = imagem !== null ? imagem : filme.imagem; // Mantém a imagem atual se null
    filme.status = status !== undefined ? status : filme.status; // Mantém o status atual se não fornecido
    return this.filmesRepository.save(filme);
  }

  async remove(id: number): Promise<void> {
    const filme = await this.findOne(id); // Verifica existência antes de remover
    await this.filmesRepository.remove(filme);
  }
}