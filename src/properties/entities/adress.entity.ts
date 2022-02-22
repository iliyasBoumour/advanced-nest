import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  adress: string;
}
