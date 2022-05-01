import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagiratedResult } from '../common/models/pagirated-result.model';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract/abstract.service';
import { Order } from './models/order.entity';

@Injectable()
export class OrderService extends AbstractService {

    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {
        super(orderRepository);
    }

    async paginate(page: number = 1, relations = []): Promise<PagiratedResult> {

        const take = 2;
        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });

        return {

            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                created_at: order.created_at,
                total: order.total,
                order_items:order.order_items
            })),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        };

    }

    async chart(){
    return this.orderRepository.query(`SELECT DATE_FORMAT(o.created_at,'%Y-%m-%d') as date,SUM(i.price*i.quantity) as sum FROM orders o 
    JOIN order_items i on o.id =i.order_id
    GROUP BY date
    `);
    }

}
