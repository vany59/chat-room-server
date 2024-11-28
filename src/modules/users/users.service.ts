import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create({ userName }: { userName: string }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = new User();
      user.userName = userName;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return user;
    } catch (err) {
      console.log('error', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByUserName(userName: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ userName });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
