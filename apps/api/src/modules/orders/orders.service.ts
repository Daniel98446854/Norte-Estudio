import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { CreateOrderDto } from '@shop/shared';
import { CartService } from '../cart/cart.service.js';

@Injectable()
export class OrdersService {
  constructor(private readonly cartService: CartService) {}

  createOrder(customer: CreateOrderDto) {
    const cart = this.cartService.getCart();
    if (cart.lines.length === 0) {
      throw new BadRequestException(
        'No se puede crear un pedido con la cesta vacía',
      );
    }

    const order = {
      id: randomUUID(),
      ...customer,
      status: 'PENDING',
      total: cart.total,
      items: cart.lines,
      createdAt: new Date().toISOString(),
    };
    this.cartService.clear();
    return order;
  }
}
