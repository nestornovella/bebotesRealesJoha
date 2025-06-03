'use client'
import React, { useEffect } from 'react';
import useUpdateProduct from '../../hooks/updateProductHook';
import UpdateInputsSection from './updateInputsSection';

const UpdateProduct =  ({id}:{id:string}) => {
    const {findProduct, handleCategory, handleInput, setImage, setParent, input, submit } = useUpdateProduct()

    useEffect(()=>{
        findProduct(id)
    },[])

    return (
        <UpdateInputsSection findProduct={findProduct} submit={submit} handleCategory={handleCategory} handleInput={handleInput} input={input} setImage={setImage} setParent={setParent} />
    );
};

export default UpdateProduct;