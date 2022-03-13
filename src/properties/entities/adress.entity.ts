import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  adress: string;
}
