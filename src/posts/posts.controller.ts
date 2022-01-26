import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ManagerJwtAuthGuard } from '../auth/guards/manager-jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './dto';

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

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: 'number' })
  async getPost(@Param('id') id) {
    return await this.postsService.findPost(id);
  }

  @Put(':id')
  @UseGuards(ManagerJwtAuthGuard)
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiBearerAuth('JWT-auth')
  async updatePost(@Param('id') id, @Body() body: UpdatePostDto) {
    return await this.postsService.updatePost(id, body.content);
  }

  @Delete(':id')
  @UseGuards(ManagerJwtAuthGuard)
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiBearerAuth('JWT-auth')
  async deletePost(@Param('id') id) {
    return await this.postsService.deletePost(id);
  }
}
