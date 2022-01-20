import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  DeletedAt: Date;
}
