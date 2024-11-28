import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Please enter user name' })
  @IsString({ message: 'Please enter valid user name' })
  @ApiProperty()
  userName: string;
}
