import { CreateDateColumn } from 'typeorm';

export function CreateColumn(): PropertyDecorator {
  return CreateDateColumn({
    precision: 0,
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  });
}
