'use client'

import MainContainer from '@/app/helpers/containers/MainContainer';
import useMainChargeHook from '@/app/hooks/mainCharge.hook';
import { useProductsStore } from '@/app/store/products.store';
import React, { useEffect, useState } from 'react';
import CardDelete from './card';
import { HeaderAdmin } from '../../../components/admin/filesComponents';
import useDeleteProduct from '@/app/admin/hooks/deleteProduct.hook';
import { BlurModal } from '../../../components/modals/modals';
import useToogleOpenHook from '@/app/admin/hooks/toogleHooks';
import DeleteModalConfirrm from '../../../components/modals/modalComponents/deleteModal';



const DeleteSection = () => {
    const { initialCharge } = useMainChargeHook()
    const { products } = useProductsStore()
    const {deleteProduct} = useDeleteProduct()
    const {toogleOpen, status, close} = useToogleOpenHook()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        initialCharge(true)
    }, [])


    function handleProduct(product){
        setProduct(product)
    }
    return (
        <MainContainer>
            <BlurModal status={status} close={close}>
                <DeleteModalConfirrm product={product} handle={deleteProduct} toogle={toogleOpen}/>
            </BlurModal>
            <HeaderAdmin title={'Eliminar Producto'}/>
            <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-2 my-4'>
                {products?.map(pr =>{
                return (
                    
                    <CardDelete key={pr.id} toogle={toogleOpen} callback={handleProduct} pr={pr}/>
                )
                
            })}
            </div>
            
        </MainContainer>
    );
};

export default DeleteSection;