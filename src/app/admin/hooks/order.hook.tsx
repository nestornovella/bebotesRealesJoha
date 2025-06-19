import React, { useState } from 'react';
import { useCartStore } from '../../store/cart.store';
import axios from 'axios';
import { Order, Product } from '@/app/interfaces/modelsInterfaces';

const useOrderHook = () => {

    const { cart } = useCartStore()
    const [order, setOrder] = useState(null)

    async function submitOrder() {
        try {
            const cartProducts = Object.values(cart)
            const response = await axios.post('/api/orders', { items: cartProducts })
            setOrder(response.data.response.id)

            return response.data.response.id
        } catch (error) {
            if (error instanceof Error)
                console.log(error)
        }
    }


    async function updateStatus(id: Product['id'], status: Order["status"]) {
        try {
            const { data } = await axios.put('/api/orders/' + id, {status})
            console.log(data)
            if (data.error) throw new Error(data.response)
            return true
        } catch (error) {
            
            if (error instanceof Error) return false
            return false
        }
    }

    console.log(order, 'orderHook')
    return {
        order,
        submitOrder,
        updateStatus
    }
};

export default useOrderHook;