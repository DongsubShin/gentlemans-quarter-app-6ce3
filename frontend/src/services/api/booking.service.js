"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const axiosInstance_1 = __importDefault(require("./axiosInstance"));
exports.bookingService = {
    getServices: () => axiosInstance_1.default.get('/services').then(res => res.data),
    getBookings: () => axiosInstance_1.default.get('/bookings').then(res => res.data),
    getLiveQueue: () => axiosInstance_1.default.get('/queue/live').then(res => res.data),
    getDashboardStats: () => axiosInstance_1.default.get('/admin/stats').then(res => res.data),
    createBooking: (data) => axiosInstance_1.default.post('/bookings', data).then(res => res.data),
    joinQueue: (data) => axiosInstance_1.default.post('/queue/join', data).then(res => res.data),
};
