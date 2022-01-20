import { UpdateDateColumn } from 'typeorm';

export function UpdatedColumn(): PropertyDecorator {
  return UpdateDateColumn({
    precision: 0,
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  });
}
