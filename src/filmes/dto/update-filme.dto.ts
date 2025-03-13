import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateFilmeDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  imagem?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsNumber()
  @IsOptional()
  starRating?: number;
}