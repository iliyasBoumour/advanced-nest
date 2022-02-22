import { Adress } from './adress.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  type: string;
  @OneToOne(() => Adress, { eager: true, cascade: true })
  @JoinColumn()
  adress: Adress;
}
