import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './models/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { OrderItem } from './models/order-item.entity';

@Module({

  imports:[
    TypeOrmModule.forFeature([Order,OrderItem]),
    CommonModule
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
