import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ManagersModule } from './managers/managers.module';
import { entities } from './models/entities';

@Module({
  imports: [ConfigModule.forRoot(), ManagersModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () =>
        await createConnection({
          type: 'mariadb',
          host: process.env.DATABASE_HOST || 'localhost',
          port: 3306,
          username: process.env.DATABASE_USER_NAME || 'root',
          password: process.env.DATABASE_PASSWORD || 'password',
          database: process.env.DATABASE_DATABASE || 'database',
          entities,
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
          extra: { decimalNumbers: true },
        }),
    },
  ],
})
export class AppModule {}
