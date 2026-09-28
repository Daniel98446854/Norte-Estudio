import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service.js';

@Injectable()
export class CartService {
  private readonly quantities = new Map<string, number>();

  constructor(private readonly productsService: ProductsService) {}

  getCart() {
    const lines = [...this.quantities].map(([productId, quantity]) => {
      const product = this.productsService.findById(productId);
      return { product, quantity, lineTotal: product.price * quantity };
    });

    return {
      lines,
      total: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      currency: 'EUR',
    };
  }

  addLine(productId: string, quantity: number) {
    this.productsService.findById(productId);
    this.quantities.set(
      productId,
      (this.quantities.get(productId) ?? 0) + quantity,
    );
    return this.getCart();
  }

  removeLine(productId: string) {
    this.quantities.delete(productId);
    return this.getCart();
  }

  clear() {
    this.quantities.clear();
  }
}
