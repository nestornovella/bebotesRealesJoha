'use client'
import React, { useEffect } from 'react';
import useFindProduct from '../hooks/products.hook';
import { useProductsStore } from '../store/products.store';
import Detail from './detail';

const DetailMainSection = ({productId}: {productId:string}) => {
    
    const { findProduct, product } = useFindProduct()
    const {products} = useProductsStore()

    useEffect(()=>{
        findProduct(productId)
    },[products])

    console.log(productId, 'product detail')
    
    return (
        <div>
            {
                product && 
                <Detail product={product}/>
            }
        </div>
    );  
};

export default DetailMainSection;