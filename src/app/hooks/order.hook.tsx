import React, { useState } from 'react';
import { useCartStore } from '../store/cart.store';
import axios from 'axios';

const useOrderHook = () => {
    
    const {cart} = useCartStore()
    const [order, setOrder] = useState(null)

    async function  submitOrder(){
        try {
            const cartProducts = Object.values(cart)
            console.log(cartProducts, 'aqui')
            const response = await axios.post('/api/orders', {items:cartProducts} )
            setOrder(response.data.response.id)
            console.log(response)
            console.log(order)
            return response.data.response.id
        } catch (error) {
            if(error instanceof Error)
                console.log(error)
        }
    }
    
    console.log(order, 'orderHook')
    return {
        order,
        submitOrder
    }
};

export default useOrderHook;