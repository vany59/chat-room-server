import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.userName);
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() authDto: AuthDto) {
    return authDto.userName;
  }

  @Get('user-profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
