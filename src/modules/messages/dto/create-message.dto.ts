import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The content of the message',
    type: String,
    minLength: 1,
    maxLength: 500,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  content: string;

  @ApiProperty({
    description: 'The unique identifier of the room',
    type: String,
    example: 'e34a2fe1-8d49-4648-a215-23ac46216f84',
  })
  @IsUUID()
  roomId: string;
}
