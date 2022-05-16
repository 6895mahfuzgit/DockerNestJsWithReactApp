
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { User } from '../../models/user';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastpage, setLastpage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    useEffect(() => {

        (async () => {
            const { data } = await axios.get(`users?page=${page}`);
            setUsers(data.data);
            setLastpage(data.meta.last_page);
            setTotalRecords(data.meta.total);
        })()

    }, [page])

   

    const del = async (userId: number) => {
        if (window.confirm('Are you sure to delete this recoed?')) {
            await axios.delete(`users/${userId}`)
            setUsers(users.filter((u: User) => u.id != userId));
        }
    }

    return (
        <Wrapper>
            <div className='pt-3 pb-2 mb-3 border-bottom'>
              <Link to={'/users/create'} className='btn btn-sm btn-outline-secondary'>Add </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => {

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
                        })}
                    </tbody>
                </table>
            </div>

            <Paginator page={page} lastpage={lastpage} totalRecords={totalRecords} pageChange={page=>setPage(page)} />
        </Wrapper>
    )

}

export default Users;
