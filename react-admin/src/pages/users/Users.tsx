
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
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

    const next = () => {
        if (page < lastpage) {
            setPage(page + 1)
        }

    }


    const preview = () => {
        if (page > 1) {
            setPage(page - 1)
        }

    }

    const del = async (userId: number) => {
        if (window.confirm('Are you sure to delete this recoed?')) {
            await axios.delete(`users/${userId}`)
            setUsers(users.filter((u: User) => u.id != userId));
        }
    }

    return (
        <Wrapper>
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
                                    <td><button type="button" className="btn btn-danger" onClick={e => del(user.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example">

                Total Record  <b>{totalRecords}</b>

                <ul className="pagination justify-content-end">
                    {
                        page > 1 &&
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={preview}>Previous</a>
                        </li>
                    }

                    {
                        page < lastpage &&
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={next}>Next</a>
                        </li>
                    }
                </ul>
            </nav>

            <div >
                Page <b> {page}</b> of <b>{lastpage}</b>
            </div>
        </Wrapper>
    )

}

export default Users;
