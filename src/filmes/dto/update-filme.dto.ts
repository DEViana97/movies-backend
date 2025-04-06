import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateFilmeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsNumber()
  @IsOptional()
  starRating?: number;
}