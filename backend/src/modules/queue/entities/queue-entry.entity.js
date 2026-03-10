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
exports.QueueEntry = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
const queue_status_enum_1 = require("../../../common/enums/queue-status.enum");
let QueueEntry = class QueueEntry extends base_entity_1.BaseEntity {
    clientId;
    client;
    barberId;
    barber;
    position;
    status;
    estimatedWait;
};
exports.QueueEntry = QueueEntry;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], QueueEntry.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.queueEntries),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], QueueEntry.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'barber_id', nullable: true }),
    __metadata("design:type", Object)
], QueueEntry.prototype, "barberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barber_entity_1.Barber, (barber) => barber.queueEntries),
    (0, typeorm_1.JoinColumn)({ name: 'barber_id' }),
    __metadata("design:type", Object)
], QueueEntry.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, typeorm_1.Index)('idx_queue_position'),
    __metadata("design:type", Number)
], QueueEntry.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: queue_status_enum_1.QueueStatus,
        default: queue_status_enum_1.QueueStatus.WAITING,
    }),
    __metadata("design:type", String)
], QueueEntry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimated_wait_minutes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QueueEntry.prototype, "estimatedWait", void 0);
exports.QueueEntry = QueueEntry = __decorate([
    (0, typeorm_1.Entity)('queue_entries')
], QueueEntry);
