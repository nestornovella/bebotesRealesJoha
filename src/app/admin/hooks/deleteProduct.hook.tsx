import { response } from '@/app/api/helpers/helpers';
import { showToast } from '@/app/helpers/tostify';
import useMainChargeHook from '@/app/hooks/mainCharge.hook';
import axios, { isAxiosError } from 'axios';
import React from 'react';

const useDeleteProduct = () => {
    const { recharge } = useMainChargeHook()
    async function deleteProduct(id:string){
        showToast('eliminando producto', 'info')
        try {
            const {data} = await axios.delete('/api/products/' + id)
            if(data.error){
                console.log(data.response)
                throw new Error('no se logro eliminar el producto')
            }

            showToast('Producto Eliminado', 'success')
            recharge()
            return true
        } catch (error) {
            if(isAxiosError(error)){
                showToast('error de sistema', 'error')
                console.log(error)
                return false
            }
            if(error instanceof Error){
                showToast(error.message, 'error')
                console.log(error)
                return false
            }
        }
    }

    return {
        deleteProduct
    };
};

export default useDeleteProduct;