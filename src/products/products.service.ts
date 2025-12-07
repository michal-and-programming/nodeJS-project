import { Injectable } from '@nestjs/common';
import { db, Product } from '../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public findAll(): Product[] {
    return db.products;
  }

  public findOne(id: string): Product | undefined {
    return db.products.find((p) => p.id === id);
  }

  public create(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }

  public remove(id: string): boolean {
    const index = db.products.findIndex((p) => p.id === id);

    if (index === -1) return false;

    db.products.splice(index, 1);
    return true;
  }
}
