import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gatewate';

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
