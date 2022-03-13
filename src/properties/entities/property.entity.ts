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
  @OneToOne(() => Adress, {
    eager: true,
    // Tells TypeORM that if an adress is appended on a property, the adress should also be saved to the database.
    cascade: true,
  })
  @JoinColumn()
  adress: Adress;
}
