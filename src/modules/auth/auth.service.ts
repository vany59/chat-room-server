import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string): Promise<any> {
    const user = await this.usersService.findByUserName(userName);

    if (!user) {
      throw new BadRequestException('Wrong user name');
    }

    const payload = { id: user.id, userName: user.userName };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userName: string): Promise<any> {
    const existingUser = await this.usersService.findByUserName(userName);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.create({ userName });

    if (!user) {
      throw new InternalServerErrorException();
    }

    const payload = { id: user.id, userName: user.userName };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
