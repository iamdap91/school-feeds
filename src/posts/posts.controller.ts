import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ManagerJwtAuthGuard } from '../auth/guards/manager-jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(ManagerJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async createPost(@Body() body: CreatePostDto) {
    return await this.postsService.createPost(body);
  }
}
