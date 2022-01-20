import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CreateColumn } from '../decorators';
import { SchoolEntity } from './school.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  content: string;

  @CreateColumn()
  createdAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.posts)
  school: SchoolEntity;
}
