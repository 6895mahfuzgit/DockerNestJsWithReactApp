
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/product';
import { Role } from '../../models/role';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastpage, setLastpage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);


    useEffect(() => {

        (async () => {

            const { data } = await axios.get(`products?page=${page}`);
            setProducts(data.data);
            setLastpage(data.meta.last_page);
            setTotalRecords(data.meta.total);
        })()

    }, [page])


    const del = async (productId: number) => {
        if (window.confirm('Are you sure to delete this recoed?')) {
            await axios.delete(`products/${productId}`)
            setProducts(products.filter((r: Product) => r.id != productId));
        }
    }

    return (
        <Wrapper>
            <div className='pt-3 pb-2 mb-3 border-bottom'>
                <Link to={'/products/create'} className='btn btn-sm btn-outline-secondary'>Add </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product: Product) => {

                            return (

                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td><img src={product.image} width={50}/></td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Link to={`/products/${product.id}/edit`} className='btn  btn-outline-secondary '>Edit</Link> &nbsp;
                                        <button type="button" className="btn btn-danger" onClick={e => del(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


           <Paginator  page={page} lastpage={lastpage} totalRecords={totalRecords} pageChange={page=>setPage(page)} />
        </Wrapper>
    )

}

export default Products;
