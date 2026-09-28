import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddCartLineDto } from './dto/add-cart-line.dto.js';
import { CartService } from './cart.service.js';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Post('lines')
  addLine(@Body() body: AddCartLineDto) {
    return this.cartService.addLine(body.productId, body.quantity);
  }

  @Delete('lines/:productId')
  removeLine(@Param('productId') productId: string) {
    return this.cartService.removeLine(productId);
  }
}
