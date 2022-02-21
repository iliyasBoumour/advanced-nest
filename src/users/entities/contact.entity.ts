import { User } from './user.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';
@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  city: string;
  @Column()
  country: string;
  @OneToOne(() => User, (user) => user.contact)
  user: User;
}
