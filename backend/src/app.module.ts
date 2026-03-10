import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { QueueModule } from './modules/queue/queue.module';
import { ClientsModule } from './modules/clients/clients.module';
import { BarbersModule } from './modules/barbers/barbers.module';
import { ServicesModule } from './modules/services/services.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // Use migrations for production
    }),
    AuthModule,
    BookingsModule,
    QueueModule,
    ClientsModule,
    BarbersModule,
    ServicesModule,
    LoyaltyModule,
    AnalyticsModule,
  ],
})
export class AppModule {}