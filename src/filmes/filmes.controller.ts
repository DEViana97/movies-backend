import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FilmesService } from './filmes.service';
import { SupabaseService } from './supabase.service';
import { Filme } from './filme.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse } from '../common/response.interface';
import { ResponseUtil } from '../common/response.util';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FindFilmesDto } from './dto/find-filmes.dto';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class FilmesController {
  constructor(
    private readonly filmesService: FilmesService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  async findAll(@Query() query: FindFilmesDto): Promise<ApiResponse<Filme[]>> {
    const statusFilter = query.status === 'true' ? true : query.status === 'false' ? false : undefined;
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
  async create(@Body() createFilmeDto: CreateFilmeDto) {
    const filme = await this.filmesService.create(createFilmeDto);
    return {
      status: 201,
      message: 'Filme criado com sucesso',
      data: filme,
    };
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    const filme = await this.filmesService.update(+id, updateFilmeDto);
    return {
      status: 200,
      message: 'Filme atualizado com sucesso',
      data: filme,
    };
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.filmesService.remove(+id);
    return ResponseUtil.success(200, null);
  }
}