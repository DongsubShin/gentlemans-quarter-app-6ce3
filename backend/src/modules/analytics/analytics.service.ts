import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../bookings/entities/booking.entity';
import { BookingStatus } from '../../common/enums/booking-status.enum';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getDailySummary(date: Date) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const bookings = await this.bookingRepository.find({
      where: {
        appointmentTime: Between(startOfDay, endOfDay) as any,
        status: BookingStatus.COMPLETED,
      },
      relations: ['service'],
    });

    const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.service.price), 0);
    const totalVisits = bookings.length;

    return {
      date: startOfDay.toISOString().split('T')[0],
      totalRevenue,
      totalVisits,
    };
  }
}