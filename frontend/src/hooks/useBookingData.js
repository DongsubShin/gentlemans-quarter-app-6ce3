"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateBooking = exports.useAdminStats = exports.useLiveQueue = exports.useServices = void 0;
const react_query_1 = require("@tanstack/react-query");
const booking_service_1 = require("../services/api/booking.service");
const useServices = () => {
    return (0, react_query_1.useQuery)({
        queryKey: ['services'],
        queryFn: booking_service_1.bookingService.getServices,
    });
};
exports.useServices = useServices;
const useLiveQueue = () => {
    return (0, react_query_1.useQuery)({
        queryKey: ['queue', 'live'],
        queryFn: booking_service_1.bookingService.getLiveQueue,
        refetchInterval: 30000, // Refresh every 30s
    });
};
exports.useLiveQueue = useLiveQueue;
const useAdminStats = () => {
    return (0, react_query_1.useQuery)({
        queryKey: ['admin', 'stats'],
        queryFn: booking_service_1.bookingService.getDashboardStats,
    });
};
exports.useAdminStats = useAdminStats;
const useCreateBooking = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: booking_service_1.bookingService.createBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
};
exports.useCreateBooking = useCreateBooking;
