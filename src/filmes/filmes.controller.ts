import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FilmesService } from './filmes.service';
import { SupabaseService } from './supabase.service';
import { Filme } from './filme.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse } from '../common/response.interface';
import { ResponseUtil } from '../common/response.util';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class FilmesController {
  constructor(
    private readonly filmesService: FilmesService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  async findAll(@Query('status') status?: string): Promise<ApiResponse<Filme[]>> {
    const statusFilter = status === 'true' ? true : status === 'false' ? false : undefined;
    const filmes = await this.filmesService.findAll(statusFilter);
    return ResponseUtil.success(200, filmes);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Filme>> {
    const filme = await this.filmesService.findOne(+id);
    return ResponseUtil.success(200, filme);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async create(
    @Body('name') name: string,
    @Body('status') status: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse<Filme>> {
    let imagemUrl: string | null = null;
    if (file) {
      imagemUrl = await this.supabaseService.uploadFile(file);
    }
    const statusBoolean = status === 'true' || status === '1' ? true : false;
    const filme = await this.filmesService.create(name, imagemUrl, statusBoolean);
    return ResponseUtil.success(201, filme);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @Body('name') nome: string,
    @Body('status') status: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse<Filme>> {
    let imagemUrl: string | null = null;
    if (file) {
      imagemUrl = await this.supabaseService.uploadFile(file);
    }
    const statusBoolean = status === 'true' || status === '1' ? true : false;
    const filme = await this.filmesService.update(+id, nome, imagemUrl, statusBoolean);
    return ResponseUtil.success(200, filme);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.filmesService.remove(+id);
    return ResponseUtil.success(200, null);
  }
}