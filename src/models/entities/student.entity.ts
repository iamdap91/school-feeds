import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateColumn } from '../decorators';

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
}
