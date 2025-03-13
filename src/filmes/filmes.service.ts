import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './filme.entity';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { SupabaseService } from './supabase.service';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private filmesRepository: Repository<Filme>,
    private supabaseService: SupabaseService,
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

  async create(createFilmeDto: CreateFilmeDto, file: Express.Multer.File): Promise<Filme> {
    const imagemUrl = await this.supabaseService.uploadFile(file);
    const filme = this.filmesRepository.create({
      ...createFilmeDto,
      image: imagemUrl,
    });
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

  async remove(id: number): Promise<void> {
    const filme = await this.findOne(id); // Verifica existência antes de remover
    await this.filmesRepository.remove(filme);
  }
}