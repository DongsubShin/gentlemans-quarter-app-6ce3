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
exports.Barber = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
const queue_entry_entity_1 = require("../../queue/entities/queue-entry.entity");
let Barber = class Barber extends base_entity_1.BaseEntity {
    userId;
    user;
    specialties;
    workingHours;
    isActive;
    bookings;
    queueEntries;
};
exports.Barber = Barber;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Barber.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.barber),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Barber.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Barber.prototype, "specialties", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'working_hours', nullable: true }),
    __metadata("design:type", Object)
], Barber.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Barber.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.barber),
    __metadata("design:type", Array)
], Barber.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => queue_entry_entity_1.QueueEntry, (queue) => queue.barber),
    __metadata("design:type", Array)
], Barber.prototype, "queueEntries", void 0);
exports.Barber = Barber = __decorate([
    (0, typeorm_1.Entity)('barbers')
], Barber);
