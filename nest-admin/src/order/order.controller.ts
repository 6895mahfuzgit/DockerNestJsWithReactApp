import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { join } from 'path';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { OrderItem } from './models/order-item.entity';
import { Order } from './models/order.entity';
import { OrderService } from './order.service';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {


    constructor(private orderService: OrderService) {

    }

    @Post()
    async create(@Body() body: Order): Promise<Order> {
        return this.orderService.create(body);
    }

    @HasPermission('view_orders')
    @Get()
    async all(@Query('page') page = 1) {
        return this.orderService.paginate(page, ['order_items']);
    }


    @Post('export')
    async export(@Res() res: Response) {
        const parse = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });

        const orders = await this.orderService.all(['order_items']);

        const json = [];
        orders.forEach((o: Order) => {
            json.push({
                'ID': o.id,
                'Name': o.name,
                'Email': o.email,
                'Product Title': '',
                Price: '',
                Quantity: ''
            });

            o.order_items.forEach((i: OrderItem) => {
                json.push({
                    'ID': '',
                    'Name': '',
                    'Email': '',
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                });
            });
        });


        const csv = parse.parse(json);
        res.header('Content-Type', 'text/csv  ');
        res.attachment('order.csv')
        return res.send(csv);

    }

    @Get('chart')
    async chart() {
        return this.orderService.chart();
    }
}
