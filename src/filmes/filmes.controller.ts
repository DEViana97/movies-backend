import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FilmesService } from './filmes.service';
import { SupabaseService } from './supabase.service';
import { Filme } from './filme.entity';

@Controller('filmes')
export class FilmesController {
  constructor(
    private readonly filmesService: FilmesService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get() // Adicione este método se estiver faltando
  findAll(): Promise<Filme[]> {
    return this.filmesService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagem', {
    storage: memoryStorage(),
  }))
  async create(
    @Body('nome') nome: string,
    @Body('status') status: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Filme> {
    let imagemUrl: string | null = null;
    if (file) {
      imagemUrl = await this.supabaseService.uploadFile(file);
    }
    const statusBoolean = status === 'true' || status === '1' ? true : false;
    return this.filmesService.create(nome, imagemUrl, statusBoolean);
  }
}