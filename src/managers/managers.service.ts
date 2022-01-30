import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { ExistingAccountError } from '../errors';
import { ManagerEntity } from '../models/entities';
import { RegisterManagerDto } from './dto';
import { Role } from '../common';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, name }: RegisterManagerDto) {
    const account = await this.managerRepository.findOne({ select: ['id'], where: { email } });
    if (account) {
      throw new ExistingAccountError();
    }
    return await this.managerRepository.save({ email, password, name });
  }

  async validateUser({ email, password }): Promise<Omit<ManagerEntity, 'password'>> {
    const account = await this.managerRepository.findOne({
      select: ['id', 'email', 'name', 'password'],
      where: { email },
    });

    if (account && account.password === password) {
      const { password, ...result } = account;
      return result;
    }

    return null;
  }

  async login({ id, email, name }: Pick<ManagerEntity, 'id' | 'email' | 'name'>) {
    const payload = { id, email, name, role: Role.Manager };
    return { 'access-token': this.jwtService.sign(payload) };
  }
}
