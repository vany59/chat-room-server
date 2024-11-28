import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from '../rooms/room.entity';
import { RoomParticipant } from '../rooms/room-participant.entity';
import { Message } from '../messages/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Room, (room) => room.creator)
  createdRooms: Room[];

  @OneToMany(() => RoomParticipant, (participant) => participant.user)
  participatingRooms: RoomParticipant[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
