import { JwtAuthGuard } from './../authentication/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Query,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import Pageable from '../shared/types/pageable.entity';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from './entities/post.entity';
import { NumericParam } from '../shared/types/numparam.entity';
import RequestWithUser from '../authentication/interfaces/requestWithUser.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() { user }: RequestWithUser,
  ): Promise<PostModel> {
    return this.postsService.create(createPostDto, user);
  }
  @Get()
  // Automatically caching responses
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() { search, limit, offset }: Pageable) {
    console.log(limit, offset, search);

    return this.postsService.findAll(limit, offset, search);
  }

  @Get(':id')
  findOne(@Param() { id }: NumericParam): Promise<PostModel> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: NumericParam,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: NumericParam): Promise<void> {
    return this.postsService.remove(id);
  }
}
