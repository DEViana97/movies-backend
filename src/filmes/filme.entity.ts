import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class Filme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  image: string | null;

  @Column({ default: false })
  status: boolean;

  @Column({ nullable: true, type: 'float' })
  starRating?: number;
}