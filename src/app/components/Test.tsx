'use client'

import React, { useEffect } from 'react';
import { useProductsStore } from '../store/products.store';
import { useCategoriesStore } from '../store/categories.store';

const Test = () => {

    const {getProducts, products} = useProductsStore()
    const {getCategories} = useCategoriesStore()

    useEffect(()=>{
        const response = getProducts()
        response.then(response => {
            response 
            &&
            getCategories()
        })
    },[])

    return (
        <div>
            <h1 className='text-2xl font-bold'>Test Component</h1>
        </div>
    );
};

export default Test;