import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => SchoolEntity, (school) => school.manager)
  schools: SchoolEntity[];
}
