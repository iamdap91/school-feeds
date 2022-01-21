import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { CreateColumn } from '../decorators';
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

  @CreateColumn()
  createdAt: Date;

  @Column({ default: null })
  deletedAt: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.posts)
  school: SchoolEntity;
}
