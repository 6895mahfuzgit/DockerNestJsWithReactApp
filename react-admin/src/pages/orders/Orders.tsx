
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Order } from '../../models/order';
import { OrderItems } from '../../models/order-item';
import { Product } from '../../models/product';
import { Role } from '../../models/role';

const hide = {
    maxHeight: 0
}

const show = {
    maxHeight: '150px'
}
const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastpage, setLastpage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('orders')

                setOrders(data.data);
            }
        )()

    }, []);



    const selected = (id: number) => {
        if (selectedId == id) {
            setSelectedId(0);
        } else {
            setSelectedId(id);
        }
    }


    const handleExport = async () => {

        const { data } = await axios.post('orders/export', {}, { responseType: 'blob' });
        const blob = new Blob([data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(data);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.csv';
        link.click();

    }


    return (<Wrapper>
        <div className='pt-3 pb-2 mb-3 border-bottom'>
            <a href='#' className='btn btn-sm btn-outline-secondary' onClick={handleExport}>Export </a>
        </div>
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: Order) => {
                        return (
                            <>
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <button type="button" className="btn btn-info" onClick={() => selected(order.id)} >View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5}>
                                        <div className='overflow-hidden' style={selectedId === order.id ? show : hide}>
                                            <table className='table table-sm'>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Product Title</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Price</th>
                                                    </tr>
                                                </thead>
                                                {order.order_items && order.order_items.map((order_item: OrderItems) => {

                                                    return (

                                                        <tr key={order_item.id}>
                                                            <td>{order_item.id}</td>
                                                            <td>{order_item.product_title}</td>
                                                            <td>{order_item.quantity}</td>
                                                            <td>{order_item.price}</td>
                                                            <td>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}        <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>

        <Paginator page={page} lastpage={lastpage} totalRecords={totalRecords} pageChange={page => setPage(page)} />
    </Wrapper>);

}

export default Orders;