import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Filme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'text', nullable: true })
  imagem: string | null;

  @Column()
  status: boolean;
}