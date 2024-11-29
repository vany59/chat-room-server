import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway(parseInt(process.env.WS_PORT) || 3001, {
  cors: {
    origin: process.env.TRUSTED_DOMAIN,
  },
})
export class EventsGateway implements OnModuleInit {
  constructor(
    private jswService: JwtService,
    private configService: ConfigService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (client) => {
      console.log('[WS] connected', client.id);
      const token = client.handshake.headers.authorization;
      console.log(token);
      try {
        const payload = await this.jswService.verifyAsync(token, {
          secret: this.configService.get('JWT_SECRET'),
        });
        if (payload) {
          console.log('[WS] User connected', payload);
          return;
        }
      } catch (err) {
        console.error(`[WS] Authentication error: ${err.message}`);
        client.disconnect();
      }
    });
  }

  @SubscribeMessage('newMessage')
  handleEvent(@MessageBody() data: unknown) {
    console.log('[WS] newMessage', data);
    this.server.emit('onMessage', data);
  }
}
