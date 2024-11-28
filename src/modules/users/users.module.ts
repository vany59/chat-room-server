import { DynamicModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({})
export class UsersModule {
  static forRoot(): DynamicModule {
    return {
      module: UsersModule,
      imports: [TypeOrmModule.forFeature([User])],
      providers: [UsersService],
      exports: [UsersService],
      global: true,
    };
  }
}
