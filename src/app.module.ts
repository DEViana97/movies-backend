import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmesModule } from './filmes/filmes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://beatriz_owner:npg_YUzQ1Mupk5in@ep-flat-smoke-a8zwme7l-pooler.eastus2.azure.neon.tech/beatriz?sslmode=require',
      autoLoadEntities: true,
      synchronize: true, // Sincroniza automaticamente as entidades (use só em desenvolvimento)
    }),
    FilmesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}