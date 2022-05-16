
import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/product';
import { Role } from '../../models/role';

const ProductEdit= () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    let { id } = useParams(); 
    
    useEffect(()=>{

        (
          async ()=>{
              console.log('ID',id);
              
              const { data } = await axios.get(`products/${id}`);
              console.log('Data:-',data);
              
              setTitle(data.title);
              setDescription(data.description);
              setImage(data.image);
              setPrice(data.price);
          }
        )()

      },[]) 

    const submit=async (e:SyntheticEvent)=>{
        e.preventDefault();
    

       

        await axios.put(`products/${id}`,{
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
                    <input defaultValue={title} onChange={e => setTitle(e.target.value)} className='form-control' />
                </div>
    
                <div className='mb-3'>
                    <label>Description</label>
                    <input  defaultValue={description} onChange={e => setDescription(e.target.value)} className='form-control' />
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
                    <input defaultValue={price} type='number' onChange={e => setPrice(e.target.value)} className='form-control' />
                </div>
    
    
                <button className='btn btn-outline-secondary'>update</button>
            </form>    
    </Wrapper>);

}


export default ProductEdit;