import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';


const UserEdit = (props:any) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);
    
    let { id } = useParams(); 

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('roles');
                setRoles(response.data);

               
               
              
                const { data } = await axios.get(`users/${id}`);

                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setRoleId(data.role.id);

            }

        )()
    },[])

    const submit=async (e:SyntheticEvent)=>{
        e.preventDefault();

        await axios.put(`users/${id}`,{
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
                <input defaultValue={firstName} onChange={e => setFirstName(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Last Name</label>
                <input defaultValue={lastName} onChange={e => setLastName(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Email</label>
                <input  defaultValue={email} onChange={e => setEmail(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Role</label>
                <select value={roleId} onChange={e => setRoleId(e.target.value)} className='form-control' >
                  { roles.map((r:Role)=>{
                      return (
                          <option key={r.id} value={r.id}>{r.name}</option>
                      )
                  })}
                </select>
            </div>
            <button className='btn btn-outline-secondary'>Update</button>
        </form>
    </Wrapper>
}

export default UserEdit;