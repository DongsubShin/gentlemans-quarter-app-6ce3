"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const bookings_module_1 = require("./modules/bookings/bookings.module");
const queue_module_1 = require("./modules/queue/queue.module");
const clients_module_1 = require("./modules/clients/clients.module");
const barbers_module_1 = require("./modules/barbers/barbers.module");
const services_module_1 = require("./modules/services/services.module");
const loyalty_module_1 = require("./modules/loyalty/loyalty.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: false, // Use migrations for production
            }),
            auth_module_1.AuthModule,
            bookings_module_1.BookingsModule,
            queue_module_1.QueueModule,
            clients_module_1.ClientsModule,
            barbers_module_1.BarbersModule,
            services_module_1.ServicesModule,
            loyalty_module_1.LoyaltyModule,
            analytics_module_1.AnalyticsModule,
        ],
    })
], AppModule);
