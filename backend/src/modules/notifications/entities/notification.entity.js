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
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const notification_status_enum_1 = require("../../../common/enums/notification-status.enum");
let Notification = class Notification extends base_entity_1.BaseEntity {
    clientId;
    client;
    type; // e.g., 'SMS_REMINDER', 'BOOKING_CONFIRMATION'
    scheduledAt;
    sentAt;
    status;
    message;
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], Notification.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.notifications),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], Notification.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Notification.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sent_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: notification_status_enum_1.NotificationStatus,
        default: notification_status_enum_1.NotificationStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)('notifications')
], Notification);
