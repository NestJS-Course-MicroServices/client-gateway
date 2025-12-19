import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register(
      {
        clients: [
          {
            name: ORDER_SERVICE,
            transport: Transport.TCP,
            options: {
              port: envs.ordersMicroservicePort,
              host: envs.ordersMicroserviceHost
            }
          }
        ]


      }
    )]
})
export class OrdersModule { }
