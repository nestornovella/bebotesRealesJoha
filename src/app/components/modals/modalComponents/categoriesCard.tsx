import { Category } from '@/app/interfaces/modelsInterfaces';
import React from 'react';

const CategoryCardModal = ({category, handle, close}:{category:Category, handle:(category:Category)=> void, close} ) => {

    function handleCategory(){
        handle(category)
        close()
    }
    return (
        <div>
            <h2 onClick={handleCategory} className='bg-blue-500 p-1 text-sm font-bold'>{category.name}</h2>
        </div>
    );
};

export default CategoryCardModal;