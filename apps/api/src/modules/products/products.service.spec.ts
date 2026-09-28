import { NotFoundException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  const service = new ProductsService();

  it('returns the demo catalogue', () => {
    expect(service.findAll()).toHaveLength(3);
  });

  it('rejects unknown product slugs', () => {
    expect(() => service.findBySlug('missing')).toThrow(NotFoundException);
  });
});
