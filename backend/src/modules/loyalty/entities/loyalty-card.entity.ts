import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { LoyaltyTier } from '../../../common/enums/loyalty-tier.enum';

@Entity('loyalty_cards')
export class LoyaltyCard extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @OneToOne(() => Client, (client) => client.loyaltyCard)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({
    type: 'enum',
    enum: LoyaltyTier,
    default: LoyaltyTier.BRONZE,
  })
  tier: LoyaltyTier;

  @Column({ type: 'jsonb', default: '[]' })
  rewards: Array<{ id: string; name: string; redeemedAt: Date }>;
}