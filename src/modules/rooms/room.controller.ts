import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteRoomDto } from './dto/delete-room.dto';

@Controller('rooms')
@ApiBearerAuth('JWT-auth')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Request() request, @Body() createRoomDto: CreateRoomDto) {
    const existingRoom = await this.roomService.findOneBy({
      name: createRoomDto.name,
    });
    if (existingRoom) {
      throw new BadRequestException('Room name already exists');
    }
    return this.roomService.createRoom(createRoomDto, request.user);
  }

  @Get()
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Post('join')
  async joinRoom(@Request() request, @Body() joinRoomDto: JoinRoomDto) {
    return this.roomService.joinRoom(joinRoomDto.roomId, request.user);
  }

  @Delete(':id')
  async deleteRoom(@Request() request, @Param() params: DeleteRoomDto) {
    const roomId = params.id;
    await this.roomService.deleteRoom(roomId, request.user);
    return { message: 'Room deleted successfully' };
  }
}