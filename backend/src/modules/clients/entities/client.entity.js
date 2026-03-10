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
exports.Client = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
const loyalty_card_entity_1 = require("../../loyalty/entities/loyalty-card.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
const queue_entry_entity_1 = require("../../queue/entities/queue-entry.entity");
let Client = class Client extends base_entity_1.BaseEntity {
    userId;
    user;
    phone;
    email;
    visitCount;
    notes;
    bookings;
    queueEntries;
    loyaltyCard;
    notifications;
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", Object)
], Client.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.client),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Object)
], Client.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone' }),
    (0, typeorm_1.Index)('idx_client_phone'),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', nullable: true }),
    __metadata("design:type", Object)
], Client.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'visit_count', default: 0 }),
    __metadata("design:type", Number)
], Client.prototype, "visitCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Client.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.client),
    __metadata("design:type", Array)
], Client.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => queue_entry_entity_1.QueueEntry, (queue) => queue.client),
    __metadata("design:type", Array)
], Client.prototype, "queueEntries", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => loyalty_card_entity_1.LoyaltyCard, (card) => card.client, { cascade: true }),
    __metadata("design:type", loyalty_card_entity_1.LoyaltyCard)
], Client.prototype, "loyaltyCard", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.client),
    __metadata("design:type", Array)
], Client.prototype, "notifications", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)('clients')
], Client);
