// src/message/message.controller.ts
import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Request,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoomService } from '../rooms/room.service';
import { GetMessagesDto } from './dto/get-message.dto';
import { UsersService } from '../users/users.service';

@Controller('messages')
@ApiBearerAuth('JWT-auth')
export class MessageController {
  constructor(
    private messageService: MessageService,
    private roomService: RoomService,
    private userService: UsersService,
  ) {}

  @Get(':roomId')
  async getMessages(
    @Param('roomId') roomId: string,
    @Query() query: GetMessagesDto,
  ) {
    const room = await this.roomService.findOneBy({ id: roomId }); // Ensure the room exists
    return this.messageService.getMessagesByRoomWithTimestamp(room, {
      before: query.before ? new Date(query.before) : undefined,
      after: query.after ? new Date(query.after) : undefined,
      from: query.from ? new Date(query.from) : undefined,
      to: query.to ? new Date(query.to) : undefined,
      limit: query.limit ?? 50,
    });
  }

  @Post()
  async createMessage(
    @Request() request,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const userId = request.user.id;
    const { content, roomId } = createMessageDto;
    const room = await this.roomService.findOneBy({ id: roomId }); // Ensure the room exists
    const user = await this.userService.findById(userId); // Ensure the user exists
    return this.messageService.createMessage(content, room, user);
  }

  // Endpoint to edit the last message
  @Patch('edit')
  async editMessage(
    @Request() request,
    @Body() editMessageDto: EditMessageDto,
  ): Promise<Message> {
    const userId = request.user.id;
    const { roomId, content } = editMessageDto;
    const room = await this.roomService.findOneBy({ id: roomId }); // Ensure the room exists
    const user = await this.userService.findById(userId); // Ensure the user exists
    return this.messageService.editLastMessage(room, user, content);
  }
}
