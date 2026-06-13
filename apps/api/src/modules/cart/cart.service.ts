import { Injectable } from '@nestjs/common';

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  quantity: number;
  unit: string;
  storeId: string;
}

@Injectable()
export class CartService {
  // In production, store carts in Redis for fast access
  private carts = new Map<string, CartItem[]>();

  async getCart(userId: string): Promise<CartItem[]> {
    return this.carts.get(userId) || [];
  }

  async addItem(userId: string, item: CartItem): Promise<CartItem[]> {
    const cart = this.carts.get(userId) || [];
    const existingIndex = cart.findIndex(
      (i) => i.productId === item.productId,
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.carts.set(userId, cart);
    return cart;
  }

  async updateQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<CartItem[]> {
    const cart = this.carts.get(userId) || [];
    const index = cart.findIndex((i) => i.productId === productId);

    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
    }

    this.carts.set(userId, cart);
    return cart;
  }

  async removeItem(userId: string, productId: string): Promise<CartItem[]> {
    const cart = this.carts.get(userId) || [];
    const filtered = cart.filter((i) => i.productId !== productId);
    this.carts.set(userId, filtered);
    return filtered;
  }

  async clearCart(userId: string): Promise<void> {
    this.carts.delete(userId);
  }
}
