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
        console.log(products)
        const found = products.find(pr => pr.id === id)
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