import  { useEffect, useState } from 'react';
import { useProductsStore } from '../store/products.store';
import { Product } from '../interfaces/modelsInterfaces';
import useMainChargeHook from './mainCharge.hook';

const useFindProduct = () => {
    const [product, setProduct] = useState<Product | null>(null)
    const {products} = useProductsStore()
    const {initialCharge} = useMainChargeHook()

    useEffect(()=>{
        initialCharge()
    },[])

    function findProduct(id:string){
        
        let found: null | Product = null

        for(const product of products){
            if(product.id === id){
                found = product
            }

            if(product.subProduct?.length){
                product.subProduct.forEach(pr => {
                    if(pr.id === id){
                        found = pr
                    }
                })
            }
        }
        
        console.log(found, 'founded')
        if(found){
            setProduct(found)
        }
    }

    return {
        product, 
        findProduct
    }
};

export default useFindProduct;