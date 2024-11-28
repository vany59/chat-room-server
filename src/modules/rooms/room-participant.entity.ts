import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { User } from '../users/user.entity';

@Entity('room_participants')
export class RoomParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Room, (room) => room.participants, { onDelete: 'CASCADE' })
  room: Room;

  @ManyToOne(() => User, (user) => user.participatingRooms, {
    onDelete: 'CASCADE',
  })
  user: User;
}
