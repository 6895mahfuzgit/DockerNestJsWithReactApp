import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';


const UserCreate = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('roles');
                setRoles(data);
            }

        )()
    },[])

    const submit=async (e:SyntheticEvent)=>{
        e.preventDefault();

        await axios.post('users',{
            first_name:firstName,
            last_name:lastName ,
            email : email,
            password : "123456",
            role_id : roleId
        });

        setRedirect(true);
    }



    if(redirect){
        return <Navigate to={'/users'} />
    }

    return <Wrapper>
        <form onSubmit={submit} className='mt-1'>
            <div className='mb-3'>
                <label>First Name</label>
                <input onChange={e => setFirstName(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Last Name</label>
                <input onChange={e => setLastName(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Email</label>
                <input onChange={e => setEmail(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Role</label>
                <select onChange={e => setRoleId(e.target.value)} className='form-control' >
                  { roles.map((r:Role)=>{
                      return (
                          <option key={r.id} value={r.id}>{r.name}</option>
                      )
                  })}
                </select>
            </div>
            <button className='btn btn-outline-secondary'>Save</button>
        </form>
    </Wrapper>
}

export default UserCreate;