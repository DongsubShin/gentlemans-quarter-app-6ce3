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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
let User = class User extends base_entity_1.BaseEntity {
    email;
    password;
    fullName;
    role;
    barber;
    client;
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ name: 'email', unique: true }),
    (0, typeorm_1.Index)('idx_user_email'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.CLIENT,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => barber_entity_1.Barber, (barber) => barber.user),
    __metadata("design:type", barber_entity_1.Barber)
], User.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => client_entity_1.Client, (client) => client.user),
    __metadata("design:type", client_entity_1.Client)
], User.prototype, "client", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
