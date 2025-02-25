import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase = createClient(
    'https://cscpdbbmntvyqibvnufl.supabase.co', // Sua URL do Supabase
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzY3BkYmJtbnR2eXFpYnZudWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDE2NDIsImV4cCI6MjA1NjA3NzY0Mn0.bNmIFC8UOyOYhBEeBwAPhArJVEfbRnvDceJyemyu9hI', // Sua chave anon
  );

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    console.log('Tamanho do buffer:', file.buffer.length); // Verifique o tamanho
    console.log('MIME Type:', file.mimetype); // Verifique o tipo

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