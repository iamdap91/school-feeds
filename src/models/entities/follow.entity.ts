import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn, DeleteDateColumn } from 'typeorm';
import { SchoolEntity } from './school.entity';
import { StudentEntity } from './student.entity';

@Entity('follow')
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('int')
  schoolId: number;

  @Index()
  @Column('int')
  studentId: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
  @ManyToOne(() => SchoolEntity, { lazy: true })
  school: SchoolEntity;

  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  @ManyToOne(() => StudentEntity, { lazy: true })
  student: StudentEntity;
}
