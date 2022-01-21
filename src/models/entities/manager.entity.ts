import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CreateColumn } from '../decorators';
import { SchoolEntity } from './school.entity';

@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateColumn()
  createdAt: Date;

  @Column({ default: null })
  deletedAt: Date;

  @OneToMany(() => SchoolEntity, (school) => school.manager)
  schools: SchoolEntity[];
}
