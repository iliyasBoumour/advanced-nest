import { Post } from './entities/post.entity';
import { Module, CacheModule } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    // time that a response is cached before deleting it is 5 seconds
    //  the maximum number of elements in the cache is 100
    // CacheModule.register({ ttl: 120, max: 100 }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
