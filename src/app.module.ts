import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ManagersModule } from './managers/managers.module';
import { entities } from './models/entities';

@Module({
  imports: [ManagersModule],
  controllers: [],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () =>
        await createConnection({
          type: 'mysql',
          host: process.env.DATABASE_HOST || 'localhost',
          port: 3306,
          username: process.env.DATABASE_USER_NAME || 'root',
          password: process.env.DATABASE_PASSWORD || 'password',
          database: process.env.DATABASE_DATABASE || 'database',
          entities,
          synchronize: true,
        }),
    },
  ],
})
export class AppModule {}
