
import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/product';
import { Role } from '../../models/role';

const ProductCreate= () => {

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [image, setImage] = useState('');
const [price, setPrice] = useState('');
const [redirect, setRedirect] = useState(false);


const submit=async (e:SyntheticEvent)=>{
    e.preventDefault();

    await axios.post('products',{
        title,
        description,
        image,
        price
    });

    setRedirect(true);
}

if(redirect){
    return <Navigate to={'/products'} />
}

return (<Wrapper>
 <form onSubmit={submit} className='mt-1'>
            <div className='mb-3'>
                <label>Name</label>
                <input onChange={e => setTitle(e.target.value)} className='form-control' />
            </div>

            <div className='mb-3'>
                <label>Description</label>
                <input onChange={e => setDescription(e.target.value)} className='form-control' />
            </div>

            <div className='mb-3'>
                <div className='imput-group'>
                    <label>Image</label>
                    <input value={image}  onChange={e => setImage(e.target.value)} className='form-control' />
                     <ImageUpload uploaded={setImage} />
                </div>
            </div>

            <div className='mb-3'>
                <label>Price</label>
                <input type='number' onChange={e => setPrice(e.target.value)} className='form-control' />
            </div>


            <button className='btn btn-outline-secondary'>Save</button>
        </form>    
</Wrapper>);

}


export default ProductCreate;