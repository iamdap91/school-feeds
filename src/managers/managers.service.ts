import { Injectable } from '@nestjs/common';
import { RegisterManagerDto } from './dto';
import { Repository } from 'typeorm';
import { ManagerEntity } from '../models/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ExistingAccountError } from '../errors';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>
  ) {}

  async register({ email, password, name }: RegisterManagerDto) {
    const account = await this.managerRepository.findOne({ select: ['id'], where: { email } });
    if (account) {
      throw new ExistingAccountError();
    }

    const t = await this.managerRepository.save({ email, password, name });
    return t;
    // return name;
  }
}
