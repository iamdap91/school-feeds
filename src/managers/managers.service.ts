import { Injectable } from '@nestjs/common';
import { RegisterManagerDto } from './dto';
import { Repository } from 'typeorm';
용;
import { ManagerEntity } from '../models/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>
  ) {}

  async register({ name }: RegisterManagerDto) {
    // await this.managerRepository.insert(name);
    return name;
  }
}
