"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = __importStar(require("supertest"));
const app_module_1 = require("../../src/app.module");
describe('BookingController (e2e)', () => {
    let app;
    let authToken;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
        // GIVEN: A logged in client
        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'client@example.com', password: 'Password123!' });
        authToken = loginRes.header['set-cookie'][0];
    });
    describe('POST /bookings', () => {
        it('should create a booking (201)', () => {
            return request(app.getHttpServer())
                .post('/bookings')
                .set('Cookie', [authToken])
                .send({
                barberId: 'uuid-barber-1',
                serviceId: 'uuid-service-1',
                appointmentTime: new Date(Date.now() + 86400000).toISOString(),
            })
                .expect(201);
        });
        it('should return 400 for invalid date', () => {
            return request(app.getHttpServer())
                .post('/bookings')
                .set('Cookie', [authToken])
                .send({
                barberId: 'uuid-barber-1',
                serviceId: 'uuid-service-1',
                appointmentTime: 'invalid-date',
            })
                .expect(400);
        });
        it('should return 401 without token', () => {
            return request(app.getHttpServer()).post('/bookings').expect(401);
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
