import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public findAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getById(id: string): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  public create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.create({
      data: orderData,
    });
  }

  public deleteById(id: string): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data: orderData,
    });
  }
}
