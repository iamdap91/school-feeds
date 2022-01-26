import { EntityRepository, Repository } from 'typeorm';
import { StudentEntity } from '../entities';

@EntityRepository(StudentEntity)
export class StudentRepository extends Repository<StudentEntity> {}
