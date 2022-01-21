import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, DeleteDateColumn, CreateDateColumn } from 'typeorm';
import { SchoolEntity } from './school.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  content: string;

  @Index()
  @Column('int')
  schoolId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.posts)
  school: SchoolEntity;
}
