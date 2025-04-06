import { Controller, Get, Post, Put, Body, Param, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FindFilmesDto } from './dto/find-filmes.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Get()
  async findAll(@Query() query: FindFilmesDto) {
    const statusFilter = query.status === 'true' ? true : query.status === 'false' ? false : undefined;
    const filmes = await this.filmesService.findAll(statusFilter);
    return {
      status: 200,
      message: 'Request successful',
      data: filmes,
    };
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
  async update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    const filme = await this.filmesService.update(+id, updateFilmeDto);
    return {
      status: 200,
      message: 'Filme atualizado com sucesso',
      data: filme,
    };
  }
}