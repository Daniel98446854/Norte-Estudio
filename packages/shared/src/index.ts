export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  inventory: number;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
}
