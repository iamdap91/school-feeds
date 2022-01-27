import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PostEntity, SchoolEntity } from '../models/entities';
import { CreateSchoolDto } from './dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(SchoolEntity) private managerRepository: Repository<SchoolEntity>,
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>
  ) {}

  async createSchool(managerId: number, { name, type }: CreateSchoolDto) {
    return !!(await this.managerRepository.save({ name, type, managerId }));
  }

  async findPostsBySchoolId(schoolId: number) {
    return await this.postRepository.find({ where: { schoolId }, order: { id: 'DESC' } });
  }
}
