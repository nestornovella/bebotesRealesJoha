

import { Product } from '@/app/interfaces/modelsInterfaces';
import { useProductsStore } from '@/app/store/products.store';

import { useState } from 'react';

const useFindBrothers = () => {

    const [brothers , setBrothers] = useState<Product[]>([])

    const { products } = useProductsStore()
    
    function findBroters (parentId:string ){
        const result =  products.find(pr => pr.id === parentId)?.subProduct

        if(Array.isArray(result) && result.length > 0){
            setBrothers(result)
        }
    }
    
    
    return {
        findBroters,
        brothers
    }
};

export default useFindBrothers;