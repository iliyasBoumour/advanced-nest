import { Post } from './../../posts/entities/post.entity';
import { Contact } from './contact.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
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
  @Column({ unique: true, default: null })
  @Exclude()
  refreshToken?: string;
  @Column()
  @Exclude()
  readonly password: string;
  @OneToOne(() => Contact, {
    // eager: true,
    // Thanks to cascade, we can save an address while saving a user. by sending {"username":"iiyas"...,"contact":{"phone": 878678...}}
    cascade: true,
  })
  @JoinColumn()
  contact?: Contact;
  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];
}
