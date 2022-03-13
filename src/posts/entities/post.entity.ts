import { User } from './../../users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column('text')
  content: string;
  @Column({ nullable: true })
  image?: string;
  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts, {
    eager: true,
    // when the user is deleted, the post is also deleted
    onDelete: 'CASCADE',
  })
  author: User;
}
