import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gatewate';
import { MessageModule } from '../modules/messages/message.module';
import { UsersModule } from '../modules/users/users.module';
import { RoomModule } from '../modules/rooms/room.module';

@Module({
  providers: [EventsGateway],
  imports: [MessageModule, UsersModule, RoomModule],
})
export class EventsModule {}
