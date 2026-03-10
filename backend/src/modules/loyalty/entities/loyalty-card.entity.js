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
exports.LoyaltyCard = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const loyalty_tier_enum_1 = require("../../../common/enums/loyalty-tier.enum");
let LoyaltyCard = class LoyaltyCard extends base_entity_1.BaseEntity {
    clientId;
    client;
    points;
    tier;
    rewards;
};
exports.LoyaltyCard = LoyaltyCard;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], LoyaltyCard.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => client_entity_1.Client, (client) => client.loyaltyCard),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], LoyaltyCard.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], LoyaltyCard.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: loyalty_tier_enum_1.LoyaltyTier,
        default: loyalty_tier_enum_1.LoyaltyTier.BRONZE,
    }),
    __metadata("design:type", String)
], LoyaltyCard.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], LoyaltyCard.prototype, "rewards", void 0);
exports.LoyaltyCard = LoyaltyCard = __decorate([
    (0, typeorm_1.Entity)('loyalty_cards')
], LoyaltyCard);
