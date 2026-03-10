import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from '../../common/enums/booking-status.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(clientId: string, dto: CreateBookingDto): Promise<Booking> {
    const appointmentDate = new Date(dto.appointmentTime);
    
    // Check for double booking (simplified logic)
    const existing = await this.bookingRepository.findOne({
      where: {
        barberId: dto.barberId,
        appointmentTime: dto.appointmentTime as any,
        status: BookingStatus.CONFIRMED,
      },
    });

    if (existing) {
      throw new BadRequestException('Barber is already booked at this time');
    }

    const booking = this.bookingRepository.create({
      ...dto,
      clientId,
      status: BookingStatus.PENDING,
    });

    return this.bookingRepository.save(booking);
  }

  async findAll(filters: any): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: filters,
      relations: ['barber', 'client', 'service'],
      order: { appointmentTime: 'ASC' },
    });
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) throw new NotFoundException('Booking not found');
    
    booking.status = status;
    return this.bookingRepository.save(booking);
  }
}