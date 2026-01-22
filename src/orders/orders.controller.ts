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

  @Get()
  getAll() {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id))) {
      throw new NotFoundException('Order not found');
    }

    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id))) {
      throw new NotFoundException('Order not found');
    }

    await this.ordersService.deleteById(id);
    return { success: true };
  }
}
