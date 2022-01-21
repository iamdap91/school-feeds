import { Injectable } from '@nestjs/common';
import { StudentEntity } from '../models/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentEntityRepository: Repository<StudentEntity>,
    private readonly jwtService: JwtService
  ) {}

  async register(body) {
    return Promise.resolve(undefined);
  }

  async validateUser(email: string, password: string): Promise<Omit<StudentEntity, 'password'>> {
    const account = await this.studentEntityRepository.findOne({
      select: ['id', 'email', 'name', 'password'],
      where: { email },
    });

    if (account && account.password === password) {
      const { password, ...result } = account;
      return result;
    }

    return null;
  }

  async login({ id, email, name }: Pick<StudentEntity, 'id' | 'email' | 'name'>) {
    const payload = { id, email, name };
    return { 'access-token': this.jwtService.sign(payload) };
  }
}
