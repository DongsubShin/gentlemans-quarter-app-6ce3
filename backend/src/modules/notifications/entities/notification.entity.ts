import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { NotificationStatus } from '../../../common/enums/notification-status.enum';

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client, (client) => client.notifications)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  type: string; // e.g., 'SMS_REMINDER', 'BOOKING_CONFIRMATION'

  @Column({ name: 'scheduled_at', type: 'timestamp' })
  scheduledAt: Date;

  @Column({ name: 'sent_at', type: 'timestamp', nullable: true })
  sentAt: Date | null;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.SCHEDULED,
  })
  status: NotificationStatus;

  @Column({ type: 'text' })
  message: string;
}