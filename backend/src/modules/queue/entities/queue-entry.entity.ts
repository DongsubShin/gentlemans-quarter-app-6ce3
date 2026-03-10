import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { Barber } from '../../barbers/entities/barber.entity';
import { QueueStatus } from '../../../common/enums/queue-status.enum';

@Entity('queue_entries')
export class QueueEntry extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client, (client) => client.queueEntries)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'barber_id', nullable: true })
  barberId: string | null;

  @ManyToOne(() => Barber, (barber) => barber.queueEntries)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber | null;

  @Column({ type: 'int' })
  @Index('idx_queue_position')
  position: number;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING,
  })
  status: QueueStatus;

  @Column({ name: 'estimated_wait_minutes', type: 'int', default: 0 })
  estimatedWait: number;
}