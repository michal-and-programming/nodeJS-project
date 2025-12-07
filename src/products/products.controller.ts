import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const product = this.productsService.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const ok = this.productsService.remove(id);
    if (!ok) throw new NotFoundException('Product not found');
    return { deleted: true };
  }
}
