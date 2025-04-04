import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}