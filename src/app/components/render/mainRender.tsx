import { useCategoriesStore } from '@/app/store/categories.store';
import React from 'react';
import SubCAtegoriesRender from './subCategoriesRender';
import { MdOutlineLocalPlay } from 'react-icons/md';
import { getPastelColorFromString } from '../product/productCard';

const MainRender = () => {

    const { categories } = useCategoriesStore()
   
    return (
        <div>
            {
                categories.length > 0 &&
                categories.map(ct => {
                    return (
                        <div key={ct.id}>
                            <div className='my-7'>
                                <div className='  w-fit text-2xl font-bold text-white gap-2 p-2 rounded-lg flex items-center'
                                    style={{ backgroundColor: getPastelColorFromString(ct.name) }}
                                >
                                    <h2  >{ct.name} </h2>
                                    <MdOutlineLocalPlay className='size-6' />
                                </div>
                                {
                                    ct.subCategories && ct.subCategories.length > 0 &&
                                    ct.subCategories.map(sub => {
                                        return <div className='my-5' key={sub.id}>

                                            <SubCAtegoriesRender subCategory={sub} />
                                        </div>
                                    })
                                }
                            </div>

                        </div>
                    )
                })
            }

        </div>
    );
};

export default MainRender;