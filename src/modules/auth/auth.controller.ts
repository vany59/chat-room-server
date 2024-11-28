import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
    return this.authService.signUp(authDto.userName);
  }
}
