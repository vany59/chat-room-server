import { IsOptional, IsUUID, IsDateString, IsInt, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty({
    description: 'The unique identifier of the room',
    type: String,
    example: 'e34a2fe1-8d49-4648-a215-23ac46216f84',
  })
  @IsUUID()
  roomId: string;

  @ApiProperty({
    description: 'Fetch messages before this timestamp',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  before?: string;

  @ApiProperty({
    description: 'Fetch messages after this timestamp',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  after?: string;

  @ApiProperty({
    description: 'Fetch messages between these timestamps',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiProperty({
    description: 'Fetch messages between these timestamps',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiProperty({
    description: 'The number of messages to return (limit)',
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Max(100)
  limit: number = 10;
}
