import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateRoomParamDto {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
