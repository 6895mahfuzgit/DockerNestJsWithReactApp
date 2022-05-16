
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/product';
import { Role } from '../../models/role';

const Orders = () => {

   const[orders,setOrders]=useState([]);



   useEffect(()=>{
     (
        async ()=>{
            const {data}=await axios.get('orders')

            setOrders(data.data);
        }
     )()

   },[]);



    return (<Wrapper>

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
                        {/* {users.map((user: User) => {

                            return (

                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><span >{user.role.name}</span></td>
                                    <td>
                                        <Link to={`/users/${user.id}/edit`} className='btn  btn-outline-secondary '>Edit</Link> &nbsp;
                                        <button type="button" className="btn btn-danger" onClick={e => del(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })} */}
                    </tbody>
                </table>
            </div>
    </Wrapper>);

}

export default Orders;