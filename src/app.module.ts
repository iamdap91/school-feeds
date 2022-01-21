import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { entities } from './models/entities';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
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
      // cache: {
      //   type: 'ioredis',
      //   options: {
      //     host: process.env.REDIS_HOST || 'localhost',
      //     port: Number(process.env.REDIS_PORT) || 6379,
      //     db: 1,
      //   },
      // },
    }),
    SchoolsModule,
  ],
  providers: [],
})
export class AppModule {}
