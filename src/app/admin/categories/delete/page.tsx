'use client'

import { HeaderAdmin } from '@/app/components/admin/filesComponents';
import { BlurModal } from '@/app/components/modals/modals';
import MainContainer from '@/app/helpers/containers/MainContainer';
import useMainChargeHook from '@/app/hooks/mainCharge.hook';
import { Category } from '@/app/interfaces/modelsInterfaces';
import { useCategoriesStore } from '@/app/store/categories.store';
import React, { useEffect, useState } from 'react';
import useToogleOpenHook from '../../hooks/toogleHooks';
import useCreateCategoriesHook from '../../hooks/createCategory.hook';

const DeleteCategory = () => {

    const { getCategories, categories } = useCategoriesStore()
    const { initialCharge } = useMainChargeHook()
    const {close, status, toogleOpen} = useToogleOpenHook()
    const [selected, setSelected] = useState<null | Category>(null)

    function handlerCategory (ct:Category){
        setSelected(ct)
        toogleOpen()
    }

    useEffect(() => {
        initialCharge()
    }, [])

    return (
        <MainContainer>
            <HeaderAdmin title={'Eliminar categoria'} />
            <BlurModal close={close} status={status}>
                <DeleteModal ct={selected} close={close}/>
            </BlurModal>
            <div className='my-4 flex gap-2 flex-col'>
                <h2>categorias</h2>
                <div className='my-5'>
                    <p>Importante</p>
                    <p className='text-sm'>recorda que al eliminar las categorias padre todas las hijas seran eliminadas de cascada</p>
                    <p className='text-sm'>y que el producto que tenga una categoria asignada la perdera por lo que es posible que no aparezca en la pagina peincipal </p>
                    <p className='text-sm'>y el mismo deba ser aditado y re asignada una categoria nueva</p>
                </div>
                {
                    categories?.map(ct => {
                        return <div key={ct.id} className=''>
                            <CategoryCard category={ct} action={()=>{handlerCategory(ct)}} />
                            <div className='flex flex-col py-4 gap-2'>
                                {
                                    ct.subCategories?.map(sub => {
                                        return <div key={sub.id} className='px-5'>
                                            <CategoryCard action={()=>{handlerCategory(sub)}} category={sub} parent={false} />
                                        </div>
                                    })
                                }
                            </div>

                        </div>
                    })
                }
            </div>
        </MainContainer>
    );
};

export default DeleteCategory;



function CategoryCard({ category, parent = true, action }: { category: Category, parent?: boolean, action:()=> void }) {


    return (
        <div onClick={action} className=' flex gap-2  items-center hover:shadow-lg w-fit cursor-pointer'>
            {
                category?.name
            }
            <p className={`px-1 rounded ${parent ? 'bg-blue-500' : 'bg-green-500'} text-white font-bold text-xs`}>{parent ? 'Padre' : 'Hija'}</p>
        </div>
    )
}


function DeleteModal({ct, close}:{ct:Category | null, close:()=> void}){
    const {deleteCategory} = useCreateCategoriesHook()

    return <div className='flex flex-col justify-center items-center h-full'>
        <p>
            {'Desea eliminar la categoria'}
        </p>

        <p>
            {ct?.name}
        </p>

        <div className='flex gap-2 my-4'>
            <button onClick={()=> {deleteCategory(ct?.id as string)}} className='p-1 border hover:bg-red-500 cursor-pointer hover:text-white font-semibold'>eliminar</button>
            <button onClick={close} className='p-1 border hover:bg-blue-500 cursor-pointer hover:text-white font-semibold'>cancelar</button>
        </div>
    </div>
}