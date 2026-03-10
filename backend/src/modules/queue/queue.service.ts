import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntry } from './entities/queue-entry.entity';
import { QueueStatus } from '../../common/enums/queue-status.enum';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueEntry)
    private readonly queueRepository: Repository<QueueEntry>,
  ) {}

  async joinQueue(clientId: string, barberId?: string): Promise<QueueEntry> {
    const lastEntry = await this.queueRepository.findOne({
      where: { status: QueueStatus.WAITING },
      order: { position: 'DESC' },
    });

    const position = lastEntry ? lastEntry.position + 1 : 1;
    const estimatedWait = position * 20; // Assume 20 mins per cut

    const entry = this.queueRepository.create({
      clientId,
      barberId,
      position,
      estimatedWait,
      status: QueueStatus.WAITING,
    });

    return this.queueRepository.save(entry);
  }

  async getActiveQueue(): Promise<QueueEntry[]> {
    return this.queueRepository.find({
      where: { status: QueueStatus.WAITING },
      relations: ['client', 'barber'],
      order: { position: 'ASC' },
    });
  }
}