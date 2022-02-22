import { User } from './../../users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  @ManyToOne(() => User, (author: User) => author.posts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  author: User;
}
