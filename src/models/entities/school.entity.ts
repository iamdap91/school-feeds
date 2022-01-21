import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ManagerEntity } from './manager.entity';
import { PostEntity } from './post.entity';
import { FollowEntity } from './follow.entity';

@Entity('school')
export class SchoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('int')
  managerId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => ManagerEntity, (manager) => manager.schools)
  manager: ManagerEntity;

  @OneToMany(() => PostEntity, (post) => post.school)
  posts: PostEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.school)
  follows: FollowEntity[];
}
