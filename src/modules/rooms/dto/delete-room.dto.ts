import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteRoomDto {
  @IsUUID()
  @ApiProperty()
  id: string;
}
