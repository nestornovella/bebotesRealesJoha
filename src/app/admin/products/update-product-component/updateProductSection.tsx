'use client'
import { HeaderAdmin } from '@/app/components/admin/filesComponents';
import MainContainer from '@/app/helpers/containers/MainContainer';
import useMainChargeHook from '@/app/hooks/mainCharge.hook';
import { useProductsStore } from '@/app/store/products.store';
import React, { useEffect } from 'react';
import CardUpdate from './cardUpdate';

const UpdateSection = () => {
    const {products} = useProductsStore()
    const {initialCharge} = useMainChargeHook()


    useEffect(()=>{
        initialCharge()
    },[])

    

    return (
         <MainContainer>
            <div>
                <HeaderAdmin title={'Actualizar Producto'}/>
                <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-2 my-10'>
                    {
                    products?.map(pr => {
                        return(
                            <CardUpdate  pr={pr} key={pr.id} />
                        )
                    })
                }
                </div>
                
            </div>
        </MainContainer>
    );
};

export default UpdateSection;