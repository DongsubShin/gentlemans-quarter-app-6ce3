import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Barber } from '../../barbers/entities/barber.entity';
import { Client } from '../../clients/entities/client.entity';
import { Service } from '../../services/entities/service.entity';
import { BookingStatus } from '../../../common/enums/booking-status.enum';

@Entity('bookings')
export class Booking extends BaseEntity {
  @Column({ name: 'barber_id' })
  barberId: string;

  @ManyToOne(() => Barber, (barber) => barber.bookings)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client, (client) => client.bookings)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'service_id' })
  serviceId: string;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'appointment_time', type: 'timestamp' })
  @Index('idx_booking_time')
  appointmentTime: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}