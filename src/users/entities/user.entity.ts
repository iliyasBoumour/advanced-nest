import { Contact } from './contact.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  @Exclude()
  readonly password: string;
  @OneToOne(() => Contact, {
    eager: true,
    // Thanks to that, we can save an address while saving a user. by sending {"username":"iiyas"...,"contact":{"phone": 878678...}}
    cascade: true,
  })
  @JoinColumn()
  contact?: Contact;
}
