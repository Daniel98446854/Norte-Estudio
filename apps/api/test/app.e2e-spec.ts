import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';

describe('Shop API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  it('reports API health', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect({ status: 'ok', service: 'shop-api' });
  });

  it('creates an order from a validated cart', async () => {
    await request(app.getHttpServer())
      .post('/api/cart/lines')
      .send({ productId: 'atlas', quantity: 2 })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .send({ customerName: 'Ada Lovelace', customerEmail: 'ada@example.com' })
      .expect(201);

    expect(response.body).toMatchObject({
      customerName: 'Ada Lovelace',
      customerEmail: 'ada@example.com',
      status: 'PENDING',
      total: 5600,
    });
    expect(response.body.id).toBeTruthy();
  });

  it('rejects invalid cart quantities', () => {
    return request(app.getHttpServer())
      .post('/api/cart/lines')
      .send({ productId: 'atlas', quantity: 21 })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});
