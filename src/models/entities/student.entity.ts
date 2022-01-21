import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { FollowEntity } from './follow.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => FollowEntity, (follow) => follow.student)
  follows: FollowEntity[];
}
