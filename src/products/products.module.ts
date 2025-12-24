import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';
import { NastModule } from 'src/transports/nast.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NastModule
  ]
})
export class ProductsModule {

}
