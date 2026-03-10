import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
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