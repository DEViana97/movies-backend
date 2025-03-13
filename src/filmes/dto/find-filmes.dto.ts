import { IsOptional, IsBooleanString } from 'class-validator';

export class FindFilmesDto {
  @IsOptional()
  @IsBooleanString({ message: 'Status deve ser "true" ou "false"' })
  status?: string;
}