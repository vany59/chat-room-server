import { IsString, IsUUID } from 'class-validator';

export class NewMessageDto {
  @IsString()
  content: string;

  @IsUUID()
  roomId: string;
}
