import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './filme.entity';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filme])],
  controllers: [FilmesController], // Confirme que está aqui
  providers: [FilmesService, SupabaseService],
})
export class FilmesModule {}