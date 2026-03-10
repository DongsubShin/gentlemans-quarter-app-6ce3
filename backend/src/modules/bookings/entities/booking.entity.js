"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const service_entity_1 = require("../../services/entities/service.entity");
const booking_status_enum_1 = require("../../../common/enums/booking-status.enum");
let Booking = class Booking extends base_entity_1.BaseEntity {
    barberId;
    barber;
    clientId;
    client;
    serviceId;
    service;
    appointmentTime;
    status;
    notes;
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.Column)({ name: 'barber_id' }),
    __metadata("design:type", String)
], Booking.prototype, "barberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barber_entity_1.Barber, (barber) => barber.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'barber_id' }),
    __metadata("design:type", barber_entity_1.Barber)
], Booking.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], Booking.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], Booking.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_id' }),
    __metadata("design:type", String)
], Booking.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'service_id' }),
    __metadata("design:type", service_entity_1.Service)
], Booking.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appointment_time', type: 'timestamp' }),
    (0, typeorm_1.Index)('idx_booking_time'),
    __metadata("design:type", Date)
], Booking.prototype, "appointmentTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: booking_status_enum_1.BookingStatus,
        default: booking_status_enum_1.BookingStatus.PENDING,
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "notes", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)('bookings')
], Booking);
