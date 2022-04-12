import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    //  we can interact with the cache manually. First we need to inject it into our service.
    //  the cache manager provides a key-value store
    //  cacheManager.get('key') ,
    // cacheManager.set('key', 'value),
    // cacheManager.del('key'),
    // clear the whole cache: cacheManager.reset()
    @Inject(CACHE_MANAGER) private cacheManager,
  ) {}

  // we invalidate our cache when the list of posts should change. With that, we can increase the Time To Live (TTL) and increase our application’s performance.
  private async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();

    keys.forEach((key) => {
      if (key.startsWith('/posts')) {
        this.cacheManager.del(key);
      }
    });
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const newPost: Post = this.postsRepository.create({
      ...createPostDto,
      author: user,
    }); // const newPost=new Post(args)
    await this.clearCache();
    return this.postsRepository.save(newPost);
  }

  async findAll(
    limit = 10,
    offset = 0,
    search = '',
  ): Promise<{ data: Post[]; count: number }> {
    const [data, count] = await this.postsRepository.findAndCount({
      where: { title: Like(`%${search}%`) },
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
    await this.clearCache();
    return this.postsRepository.save(newPost);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.clearCache();
    await this.postsRepository.remove(post);
  }
}
