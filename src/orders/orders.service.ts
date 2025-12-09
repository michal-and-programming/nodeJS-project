import { Injectable } from '@nestjs/common';
import { db, Order } from '../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public findAll(): Order[] {
    return db.orders;
  }

  public findOne(id: string): Order | undefined {
    return db.orders.find((o) => o.id === id);
  }

  public create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public remove(id: string): boolean {
    const index = db.orders.findIndex((o) => o.id === id);

    if (index === -1) return false;

    db.orders.splice(index, 1);
    return true;
  }

  public updateById(id: Order['id'], orderData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((o) => {
      if (o.id === id) {
        return { ...o, ...orderData };
      }
      return o;
    });
  }
}
