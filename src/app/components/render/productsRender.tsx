import { useProductsStore } from '@/app/store/products.store';
import React from 'react';
import ProductCard from '../product/productCard';

const ProductsRender = ({ subCategory }) => {

    const { products } = useProductsStore()

    return (
        <div className='grid xl:grid-cols-4 gap-4 w-full'>
            {
                products.length > 0 && products.filter(prod => { return prod.categories[0].name === subCategory.name }).map(pr => {
                    return (
                        <ProductCard key={pr.id} product={pr} />
                    )
                })
            }
        </div>
    );
};

export default ProductsRender;