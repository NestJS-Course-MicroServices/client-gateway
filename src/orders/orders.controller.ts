import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto)
      .pipe(catchError((error) => { throw new RpcException(error) }));
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id })
      .pipe(catchError(({ error }) => { throw new RpcException(error) }))
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto) {
    return this.client.send('changeOrderStatus', { id, status: statusDto.status })
      .pipe(catchError(({ error }) => { throw new RpcException(error) }))
  }


}
