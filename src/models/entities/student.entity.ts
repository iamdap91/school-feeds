import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @Column()
  deletedAt: Date;

  @ManyToOne(() => FollowEntity, (follow) => follow.student)
  follows: FollowEntity[];
}
