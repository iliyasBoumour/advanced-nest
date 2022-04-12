import { Post } from './entities/post.entity';
import { Module, CacheModule } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    // time that a response is cached before deleting it is 5 seconds
    //  the maximum number of elements in the cache is 100
    CacheModule.register({ ttl: 5, max: 100 }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
