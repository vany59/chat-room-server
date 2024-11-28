// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { RoomModule } from '../rooms/room.module';
import { UsersModule } from '../users/users.module';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), RoomModule, UsersModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
