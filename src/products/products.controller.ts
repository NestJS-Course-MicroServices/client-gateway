import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    try {

      // this.client.send({ cmd: 'find_one_product' }, { id })
      //   .pipe(catchError(err => { throw new RpcException(err) }));

      const product = await firstValueFrom(this.client.send({ cmd: 'find_one_product' }, { id }));
      return product;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'delete_one_product' }, { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'update_one_product' }, { ...updateProductDto, id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
