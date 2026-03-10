import { IsUUID, IsISO8601, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  @IsUUID()
  barberId: string;

  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty({ example: '2023-12-25T10:00:00Z' })
  @IsISO8601()
  appointmentTime: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}