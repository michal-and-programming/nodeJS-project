import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import type { CreateOrderDTO } from './dtos/create-order.dto';
import type { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  getAll() {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = this.ordersService.findOne(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.findOne(id)) {
      throw new NotFoundException('Order not found');
    }

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }

  @Delete('/:id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.findOne(id)) {
      throw new NotFoundException('Order not found');
    }

    const success = this.ordersService.remove(id);

    if (!success) {
      throw new NotFoundException('Order not found');
    }

    return { success: true };
  }
}
