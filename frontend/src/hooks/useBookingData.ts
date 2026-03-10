import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../services/api/booking.service';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: bookingService.getServices,
  });
};

export const useLiveQueue = () => {
  return useQuery({
    queryKey: ['queue', 'live'],
    queryFn: bookingService.getLiveQueue,
    refetchInterval: 30000, // Refresh every 30s
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: bookingService.getDashboardStats,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};