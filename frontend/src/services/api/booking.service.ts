import axiosInstance from './axiosInstance';
import { Booking, Service, QueueEntry, DashboardStats } from '../../types';

export const bookingService = {
  getServices: () => axiosInstance.get<Service[]>('/services').then(res => res.data),
  
  getBookings: () => axiosInstance.get<Booking[]>('/bookings').then(res => res.data),
  
  getLiveQueue: () => axiosInstance.get<QueueEntry[]>('/queue/live').then(res => res.data),
  
  getDashboardStats: () => axiosInstance.get<DashboardStats>('/admin/stats').then(res => res.data),
  
  createBooking: (data: Partial<Booking>) => 
    axiosInstance.post<Booking>('/bookings', data).then(res => res.data),
    
  joinQueue: (data: { serviceId: string; clientId: string }) => 
    axiosInstance.post<QueueEntry>('/queue/join', data).then(res => res.data),
};