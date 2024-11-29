import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../users/user.entity';
import { RoomParticipant } from './room-participant.entity';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomParticipant)
    private readonly roomParticipantRepository: Repository<RoomParticipant>,
  ) {}

  findOneBy(room: Partial<Room>) {
    return this.roomRepository.findOneBy(room);
  }

  async createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    const room = this.roomRepository.create({
      ...createRoomDto,
      creator: user,
    });

    const savedRoom = await this.roomRepository.save(room);

    // Add creator as a participant
    const participant = this.roomParticipantRepository.create({
      room: savedRoom,
      user: user,
    });

    await this.roomParticipantRepository.save(participant);

    return savedRoom;
  }

  async updateRoom(updateRoom: UpdateRoomDto) {
    return this.roomRepository.save(updateRoom);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['creator'] });
  }

  async joinRoom(roomId: string, user: User): Promise<RoomParticipant> {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room not found');

    let participant = await this.roomParticipantRepository.findOne({
      where: { room: room, user: user },
    });

    if (!participant) {
      participant = this.roomParticipantRepository.create({
        room: room,
        user: user,
      });
    }

    return this.roomParticipantRepository.save(participant);
  }

  async deleteRoom(roomId: string, user: User): Promise<void> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['creator'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.creator.id !== user.id) {
      throw new ForbiddenException('You can only delete rooms you created');
    }
    await this.roomRepository.remove(room);
  }

  async findRoomByUser(roomId: string, userId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['creator'],
    });
    return room?.creator?.id === userId;
  }
}
