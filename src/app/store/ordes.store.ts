import { create } from 'zustand'
import { Order } from '../interfaces/modelsInterfaces'
import axios from 'axios'


interface OrderStoreIF {
    orders: Order[]
    getOrders: () => Promise<boolean>
}

export const useOrdersStore = create<OrderStoreIF>(
    (set) => (
        {
            orders: [],

            getOrders: async () => {
                try {

                    const { data } = await axios.get('/api/orders')
                    if (data.error) throw new Error(data.message)

                    set(() => ({
                        orders: data.response
                    }))
                    return true
                } catch (error) {
                    if (error instanceof Error) {
                        return false
                    }

                    return false
                }
            }
        }
    ))