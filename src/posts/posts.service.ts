import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const newPost: Post = this.postsRepository.create({
      ...createPostDto,
      author: user,
    }); // const newPost=new Post(args)

    return this.postsRepository.save(newPost);
  }

  async findAll(limit = 10, offset = 0, search) {
    if (search) {
      const [data, count] = await this.postsRepository.findAndCount({
        where: { title: Like(`%${search}%`) },
        skip: offset,
        take: limit,
      });
      return { data, count };
    }
    const [data, count] = await this.postsRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    return { data, count };
  }

  async findOne(id: number): Promise<Post> {
    try {
      return await this.postsRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post: Post = await this.findOne(id);
    const newPost: Post = { ...post, ...updatePostDto };
    return this.postsRepository.save(newPost);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}
