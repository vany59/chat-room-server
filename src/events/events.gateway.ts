import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NewMessageDto } from './dto/new-message.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { MessageService } from '../modules/messages/message.service';
import { RoomService } from '../modules/rooms/room.service';
import { UsersService } from '../modules/users/users.service';

@WebSocketGateway(parseInt(process.env.WS_PORT) || 3001, {
  cors: {
    origin: process.env.TRUSTED_DOMAIN,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('ChatEvents');

  // Keeps track of connected users per room
  private roomParticipants: Map<string, Set<string>> = new Map();

  constructor(
    private jswService: JwtService,
    private configService: ConfigService,
    private messageService: MessageService,
    private roomService: RoomService,
    private userService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    try {
      const payload = await this.jswService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      client.data.user = payload;
    } catch (err) {
      this.logger.error(`Authentication error: ${err.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (user && user.currentRoom) {
      this.leaveRoom(client, user.currentRoom);
    }
    console.log('Client disconnected:', client.id);
  }

  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new WsException(errors),
    }),
  )
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new WsException(errors),
    }),
  )
  @SubscribeMessage('newMessage')
  async handleMessageEvent(
    @MessageBody() data: NewMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('onMessage', data);
    const room = await this.roomService.findOneBy({ id: data.roomId });
    const user = await this.userService.findById(client.data.user.id);
    if (user && room) {
      this.messageService.createMessage(data.content, room, user);
    }
  }

  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new WsException(errors),
    }),
  )
  @SubscribeMessage('joinRoom')
  handleJoinRoomEvent(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    const { roomId } = data;
    // Add user to the room participants list
    if (!this.roomParticipants.has(roomId)) {
      this.roomParticipants.set(roomId, new Set());
    }
    this.roomParticipants.get(roomId)?.add(user.username);

    client.join(roomId);
    user.currentRoom = roomId;

    // Notify all participants in the room
    this.server
      .to(roomId)
      .emit('userJoined', { username: user.username, roomId });
    this.logger.log(`${user.userName} join ${roomId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoomEvent(
    @MessageBody() data: LeaveRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    const { roomId } = data;

    this.leaveRoom(client, roomId);

    // Notify all participants in the room
    this.server
      .to(roomId)
      .emit('userLeft', { username: user.username, roomId });
    this.logger.log(`${user.userName} leave ${roomId}`);
  }

  private leaveRoom(client: Socket, roomId: string) {
    const user = client.data.user;
    client.leave(roomId);
    // Remove user from the room participants list
    const participants = this.roomParticipants.get(roomId);
    if (participants) {
      participants.delete(user.username);
      if (participants.size === 0) {
        this.roomParticipants.delete(roomId);
      }
    }
  }
}
