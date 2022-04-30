import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './models/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    CommonModule
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
