import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { ExistingAccountError } from '../errors';
import { RegisterStudentDto } from './dto';
import { StudentEntity } from '../models/entities';
import { Role } from '../common';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentEntityRepository: Repository<StudentEntity>,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, name }: RegisterStudentDto): Promise<boolean> {
    const account = await this.studentEntityRepository.findOne({ select: ['id'], where: { email } });
    if (account) {
      throw new ExistingAccountError();
    }
    return !!(await this.studentEntityRepository.save({ email, password, name }));
  }

  async validateUser({ email, password }): Promise<Omit<StudentEntity, 'password'>> {
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
    const payload = { id, email, name, role: Role.Student };
    return { 'access-token': this.jwtService.sign(payload) };
  }

  addFollow(id: number, { postId }) {
    console.log(id, postId);
  }
}
