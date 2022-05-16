import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Permission } from '../../models/permission';
import { Role } from '../../models/role';


const RoleCreate = () => {

    const [name, setName] = useState('');
    const [permissions,setPermissions]= useState([]);
    const [permissionIds,setPermissionIds]=useState([] as number[]);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        (
            async () => {
                const response = await axios.get('permissions');
                setPermissions(response.data);

            }

        )()
    },[])


    const submit=async (e:SyntheticEvent)=>{
        e.preventDefault();

        await axios.post('roles',{
            name,
            permissions:permissionIds
        });

        setRedirect(true);
    }


    const check=(id:number)=>{
        if(permissionIds.some(i=>i==id)){
            setPermissionIds(permissionIds.filter(p=>p!=id))
            return;
        }
        setPermissionIds([...permissionIds,id])
    }

    if(redirect){
        return <Navigate to={'/roles'} />
    }

    return <Wrapper>
        <form onSubmit={submit} className='mt-1'>
            <div className='mb-3'>
                <label>Name</label>
                <input onChange={e => setName(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3 row'>
                <label className='col-sm-2 col-form-label' >Permissions</label>

                <div className='col-sm-10'>
                    { permissions && permissions.map((permission:Permission)=>{
                     return       <div className='form-check form-check-inline  col-3' key={permission.id}>
                                    <input className='form-check-input' type='checkbox'
                                     value={permission.id}
                                     onChange={()=>check(permission.id)}
                                    />
                                    <label className='form-check-label '>{permission.name}</label>
                                </div>
                    })}
                </div>
            </div>
            <button className='btn btn-outline-secondary'>Save</button>
        </form>
    </Wrapper>
}

export default RoleCreate;