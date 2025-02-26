import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FilmesService } from './filmes.service';
import { SupabaseService } from './supabase.service';
import { Filme } from './filme.entity';
import { ApiResponse } from 'src/common/response.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('filmes')
// @UseGuards(JwtAuthGuard) // Protege todos os endpoints
export class FilmesController {
  constructor(
    private readonly filmesService: FilmesService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard) // Protege apenas este endpoint
async findAll(): Promise<ApiResponse<Filme[]>> {
  const filmes = await this.filmesService.findAll();
  return {
    status: 200,
    message: 'Request successful',
    data: filmes,
  };
}

  @Post()
  @UseGuards(JwtAuthGuard)
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