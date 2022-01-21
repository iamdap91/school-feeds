import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { entities } from './models/entities';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';
import { PostsModule } from './posts/posts.module';

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
    }),
    SchoolsModule,
    PostsModule,
  ],
  providers: [],
})
export class AppModule {}
