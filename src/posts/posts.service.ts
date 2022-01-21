import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PostEntity } from '../models/entities';
import { CreatePostDto } from './dto';
import { NoContentError } from '../errors';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postEntityRepository: Repository<PostEntity>
  ) {}

  async createPost({ schoolId, content }: CreatePostDto) {
    return !!(await this.postEntityRepository.save({ schoolId, content }));
  }

  async updatePost(id: number, content: string) {
    if (!content) throw new NoContentError();
    return !!(await this.postEntityRepository.update(id, { content }));
  }
}
