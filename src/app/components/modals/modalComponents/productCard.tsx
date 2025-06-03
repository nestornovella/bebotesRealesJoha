import { Product } from '@/app/interfaces/modelsInterfaces';
import Image from 'next/image';
import React from 'react';

const ProductCardModal = ({product, handle, close}: {product:Product, handle, close}) => {


    function handleClick(){
        close()
        handle(product)
    }

    return (
        <div onClick={handleClick} className='flex gap-2 boprder p-1'>
            <Image alt='iamgen producto' src={product.image} width={200} height={200}/>
            <h2>{product.name}</h2>
        </div>
    );
};

export default ProductCardModal;