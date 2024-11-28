// src/message/message.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import { Room } from '../rooms/room.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getMessagesByRoomWithTimestamp(
    room: Room,
    options: {
      before?: Date;
      after?: Date;
      from?: Date;
      to?: Date;
      limit: number;
    },
  ): Promise<Message[]> {
    const query = this.messageRepository
      .createQueryBuilder('message')
      .where('message.roomId = :roomId', { roomId: room.id });

    // Apply timestamp filters
    if (options.before) {
      query.andWhere('message.createdAt < :before', { before: options.before });
    }
    if (options.after) {
      query.andWhere('message.createdAt > :after', { after: options.after });
    }
    if (options.from && options.to) {
      query.andWhere('message.createdAt BETWEEN :from AND :to', {
        from: options.from,
        to: options.to,
      });
    }

    // Order messages by time and apply limit
    query.orderBy('message.createdAt', 'ASC').take(options.limit);

    return query.getMany();
  }

  async createMessage(
    content: string,
    room: Room,
    sender: User,
  ): Promise<Message> {
    const message = new Message();
    message.content = content;
    message.room = room;
    message.sender = sender;
    return this.messageRepository.save(message);
  }

  async editLastMessage(
    room: Room,
    user: User,
    content: string,
  ): Promise<Message> {
    // Get the last message in the room by this user
    const lastMessage = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.roomId = :roomId', { roomId: room.id })
      .andWhere('message.userId = :userId', { userId: user.id })
      .orderBy('message.createdAt', 'DESC')
      .getOne();

    if (!lastMessage) {
      throw new NotFoundException('No messages found to edit.');
    }

    // Check if a new message has been sent after this message
    const hasNewMessages = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.roomId = :roomId', { roomId: room.id })
      .andWhere('message.createdAt > :createdAt', {
        createdAt: lastMessage.createdAt,
      })
      .getOne();

    if (hasNewMessages) {
      throw new ForbiddenException(
        'Cannot edit the message, another message was sent after.',
      );
    }

    // Update the message content
    lastMessage.content = content;
    return this.messageRepository.save(lastMessage);
  }
}
