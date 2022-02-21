import { Post } from './entities/post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private lid = 0;
  create(createPostDto: CreatePostDto) {
    const newPost = { ...createPostDto, id: ++this.lid };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex == -1) {
      throw new NotFoundException();
    }
    const newPost = (this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostDto,
    });
    return newPost;
  }

  remove(id: number) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
