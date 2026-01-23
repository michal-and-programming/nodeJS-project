import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
import type { CreateOrderDTO } from './dtos/create-order.dto';
import type { UpdateOrderDTO } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public findAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        product: true,
        client: true,
      },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        product: true,
        client: true,
      },
    });
  }

  public create(orderData: CreateOrderDTO) {
    const { productId, clientId } = orderData;

    return this.prismaService.order.create({
      data: {
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
    });
  }

  public deleteById(id: string): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public updateById(id: string, orderData: UpdateOrderDTO) {
    const { productId, clientId } = orderData;

    return this.prismaService.order.update({
      where: { id },
      data: {
        ...(productId && {
          product: {
          connect: { id: productId },
      },
    }),
        ...(clientId && {
          client: {
            connect: { id: clientId },
          },
        }),
      },
    });
  }
}
