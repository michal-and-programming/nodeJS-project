import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: string): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public create(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  public deleteById(id: string): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }

  public updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }

  public getAllExtended(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { orders: true },
    });
  }

  public getExtendedById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { orders: true },
    });
  }
}
