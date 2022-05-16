
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';

const Roles = () => {

    const [roles, setRoles] = useState([]);
    
    useEffect(() => {

        (async () => {

            const { data } = await axios.get(`roles`);
            setRoles(data);
        })()

    }, [])

    

    const del = async (roleId: number) => {
        if (window.confirm('Are you sure to delete this recoed?')) {
            await axios.delete(`roles/${roleId}`)
             setRoles(roles.filter((r: Role) => r.id != roleId));
        }
    }

    return (
        <Wrapper>
            <div className='pt-3 pb-2 mb-3 border-bottom'>
              <Link to={'/roles/create'} className='btn btn-sm btn-outline-secondary'>Add </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { roles && roles.map((role: Role) => {

                            return (

                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <Link to={`/roles/${role.id}/edit`} className='btn  btn-outline-secondary '>Edit</Link> &nbsp;
                                        <button type="button" className="btn btn-danger" onClick={e => del(role.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </Wrapper>
    )

}

export default Roles;
