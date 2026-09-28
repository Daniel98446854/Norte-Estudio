import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { ProductsModule } from './modules/products/products.module.js';

@Module({
  imports: [HealthModule, ProductsModule, CartModule, OrdersModule],
})
export class AppModule {}
