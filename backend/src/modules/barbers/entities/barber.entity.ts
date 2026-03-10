import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { QueueEntry } from '../../queue/entities/queue-entry.entity';

@Entity('barbers')
export class Barber extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.barber)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text', { array: true, default: '{}' })
  specialties: string[];

  @Column({ type: 'jsonb', name: 'working_hours', nullable: true })
  workingHours: Record<string, { start: string; end: string; isOpen: boolean }>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Booking, (booking) => booking.barber)
  bookings: Booking[];

  @OneToMany(() => QueueEntry, (queue) => queue.barber)
  queueEntries: QueueEntry[];
}