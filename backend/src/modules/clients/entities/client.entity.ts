import { Entity, Column, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { LoyaltyCard } from '../../loyalty/entities/loyalty-card.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { QueueEntry } from '../../queue/entities/queue-entry.entity';

@Entity('clients')
export class Client extends BaseEntity {
  @Column({ name: 'user_id', nullable: true })
  userId: string | null;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({ name: 'phone' })
  @Index('idx_client_phone')
  phone: string;

  @Column({ name: 'email', nullable: true })
  email: string | null;

  @Column({ name: 'visit_count', default: 0 })
  visitCount: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @OneToMany(() => Booking, (booking) => booking.client)
  bookings: Booking[];

  @OneToMany(() => QueueEntry, (queue) => queue.client)
  queueEntries: QueueEntry[];

  @OneToOne(() => LoyaltyCard, (card) => card.client, { cascade: true })
  loyaltyCard: LoyaltyCard;

  @OneToMany(() => Notification, (notification) => notification.client)
  notifications: Notification[];
}