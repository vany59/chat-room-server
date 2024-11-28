import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class JoinRoomDto {
  @IsUUID()
  @ApiProperty()
  roomId: string;
}
