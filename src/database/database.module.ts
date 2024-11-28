import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('database.postgres.host'),
          port: config.get('database.postgres.port'),
          username: config.get('database.postgres.username'),
          password: config.get('database.postgres.password'),
          database: config.get('database.postgres.database'),
          synchronize: config.get('database.postgres.synchronize'),
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
