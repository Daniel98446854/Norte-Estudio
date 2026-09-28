import { Injectable, NotFoundException } from '@nestjs/common';
import type { Product } from '@shop/shared';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 'atlas',
      slug: 'botella-atlas',
      name: 'Botella Atlas',
      description: 'Botella reutilizable de acero inoxidable.',
      category: 'Accesorios',
      price: 2800,
      currency: 'EUR',
      inventory: 24,
    },
    {
      id: 'senda',
      slug: 'vela-senda',
      name: 'Vela Senda',
      description: 'Vela aromática vertida a mano.',
      category: 'Hogar',
      price: 2400,
      currency: 'EUR',
      inventory: 18,
    },
    {
      id: 'nube',
      slug: 'crema-nube',
      name: 'Crema Nube',
      description: 'Crema hidratante de uso diario.',
      category: 'Cuidado',
      price: 1900,
      currency: 'EUR',
      inventory: 32,
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw new NotFoundException(`Producto ${id} no encontrado`);
    return product;
  }

  findBySlug(slug: string): Product {
    const product = this.products.find((item) => item.slug === slug);
    if (!product) throw new NotFoundException(`Producto ${slug} no encontrado`);
    return product;
  }
}
