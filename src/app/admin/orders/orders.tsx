'use client'

import { HeaderAdmin, Input } from '@/app/components/admin/filesComponents';
import { Order } from '@/app/interfaces/modelsInterfaces';
import { useOrdersStore } from '@/app/store/ordes.store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OrdersSection = () => {

    const {getOrders, orders} = useOrdersStore()
    const [founded, setFounded] = useState<Order[]>([])
    const [input, setInput] = useState('')
    const { push } = useRouter()

    function handleInput(e:React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value)
    }

    useEffect(()=>{
        setFounded(
             orders.filter(or => or.id.includes(input))
        )
    },[input])

    useEffect(()=>{
        if(!orders.length){
            getOrders()
        }
    },[])

    return (
        <div>
            <HeaderAdmin title={'Administrar Peidos'} />

            <div className='py-5'>
                <Input handler={handleInput} label={'Buscar pedido por ID'} name={'search'} type='text' value={input} />
            </div>
            
            <div className='grid md:grid-cols-3 gap-3 py-10'>
                {
                    founded.length 
                    ?
                    founded.map(order => {
                        return  <div onClick={() => {push(`/admin/orders/${order.id}`)}} className='border p-2 rounded-lg text-white bg-black' key={order.id}>
                                <div>
                                    <p>Pedido Id: {order.id}</p>
                                    <div className='flex gap-2'>
                                    <p>Estado: </p>
                                    <p className={`${order.status == 'Pending' ? 'text-yellow-400' : order.status == 'Success' ? 'text-green-400' : 'text-red-500'}`}>{order.status}</p>
                                    </div>
                                </div>
                            </div>
                    })
                    :
                    orders?.map(order => {
                        return (
                            <div onClick={() => {push(`/admin/orders/${order.id}`)}} className='border p-2 rounded-lg text-white bg-black' key={order.id}>
                                <div>
                                    <p>Pedido Id: {order.id}</p>
                                    <div className='flex gap-2'>
                                    <p>Estado: </p>
                                    <p className={`${order.status == 'Pending' ? 'text-yellow-400' : order.status == 'Success' ? 'text-green-400' : 'text-red-500'}`}>{order.status}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default OrdersSection;