import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ExistingAccountError } from '../errors';
import { ToggleFollowDto, RegisterStudentDto } from './dto';
import { StudentEntity } from '../models/entities';
import { Role } from '../common';
import { FollowRepository, StudentRepository } from '../models/repositories';

@Injectable()
export class StudentsService {
  constructor(
    private studentRepository: StudentRepository,
    private followRepository: FollowRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, name }: RegisterStudentDto): Promise<boolean> {
    const account = await this.studentRepository.findOne({ select: ['id'], where: { email } });
    if (account) {
      throw new ExistingAccountError();
    }
    return !!(await this.studentRepository.save({ email, password, name }));
  }

  async validateUser({ email, password }): Promise<Omit<StudentEntity, 'password'>> {
    const account = await this.studentRepository.findOne({
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

  async toggleFollow(studentId: number, { schoolId }: ToggleFollowDto) {
    const follow = await this.followRepository.findOne({ where: { studentId, schoolId } });

    if (follow) {
      await this.followRepository.softDelete(follow);
    } else {
      await this.followRepository.insert({ studentId, schoolId });
    }

    return true;
  }

  async findSchoolList(studentId: number) {
    const follows = await this.followRepository.find({
      relations: ['school'],
      where: { studentId },
    });

    return await Promise.all(follows.map((follow) => follow.school));
  }
}
