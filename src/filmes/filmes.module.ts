import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './filme.entity';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';
import { SupabaseService } from './supabase.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Filme]), JwtModule],
  controllers: [FilmesController], // Confirme que está aqui
  providers: [FilmesService, SupabaseService], // Confirme que está aqui
})
export class FilmesModule {}