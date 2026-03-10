export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  loyaltyPoints: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
}

export interface Booking {
  id: string;
  clientId: string;
  serviceId: string;
  dateTime: string;
  status: BookingStatus;
  client?: User;
  service?: Service;
}

export interface QueueEntry {
  id: string;
  clientId: string;
  serviceId: string;
  joinedAt: string;
  estimatedWait: number;
  position: number;
  client?: User;
  service?: Service;
}

export interface DashboardStats {
  totalBookings: number;
  activeQueue: number;
  revenueToday: number;
  newClients: number;
}