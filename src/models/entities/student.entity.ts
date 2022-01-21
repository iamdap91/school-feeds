import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CreateColumn } from '../decorators';
import { FollowEntity } from './follow.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateColumn()
  createdAt: Date;

  @Column({ default: null })
  deletedAt: Date;

  @OneToMany(() => FollowEntity, (follow) => follow.student)
  follows: FollowEntity[];
}
