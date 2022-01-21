import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SchoolEntity } from '../models/entities';
import { CreateSchoolDto } from './dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(SchoolEntity)
    private managerRepository: Repository<SchoolEntity>
  ) {}

  async createSchool(managerId: number, { name, type }: CreateSchoolDto) {
    return !!(await this.managerRepository.save({ name, type, managerId }));
  }
}
