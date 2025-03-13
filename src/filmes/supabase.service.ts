import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '', // Sua URL do Supabase
      this.configService.get<string>('SUPABASE_ANON_KEY') || '', // Sua chave anon
    );
  }
  private supabase;

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;

    const { data, error } = await this.supabase.storage
      .from('movie-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype, // Certifique-se de que isso está correto
      });

    if (error) {
      console.log('Erro do Supabase:', error);
      throw new Error(`Erro ao fazer upload: ${error.message}`);
    }

    const { data: publicData } = this.supabase.storage
      .from('movie-images')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  }
}