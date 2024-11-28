import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { RoomParticipant } from './room-participant.entity';
import { User } from '../users/user.entity';
import { Message } from '../messages/message.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.createdRooms, { onDelete: 'CASCADE' })
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RoomParticipant, (participant) => participant.room)
  participants: RoomParticipant[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[]; // Relationship with messages
}
