import { useCategoriesStore } from '@/app/store/categories.store';
import React from 'react';

const CategorySelector = ({handle, input}) => {
    const {categories} = useCategoriesStore()
    
    return (
        <div className='flex flex-col px-3'>
            <h2 className='text-gray-700 font-bold mb-1 mx-auto'>Seleccionar categoria</h2>
            <div className='flex flex-wrap'>
                {
                categories?.map(ct => {
                    const subCategories = ct.subCategories?.map(sub => {
                        return <button onClick={()=>{handle([sub.parent, sub])}} className={`${input.categories.find(ct => ct.name === sub.name) && ' bg-blue-500 text-white'} text-xs border cursor-pointer p-1 rounded font-bold`} key={sub.id}>{sub.name}</button>
                    }) || []
                    
                    return (
                        <div key={ct.id} className='flex flex-col gap-1 mx-2  '>
                            <p className='font-semibold mx-auto'>{ct.name}</p>
                            {...subCategories}
                        </div>
                    
                    
                )
                })
            }
            </div>
            
        </div>
    );
};

export default CategorySelector;