'use client'

import { Order } from '@/app/interfaces/modelsInterfaces';
import { useOrdersStore } from '@/app/store/ordes.store';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import useOrderHook from '../../hooks/order.hook';

const DetailSection = ({ id }) => {

    const { orders, getOrders } = useOrdersStore()
    const [found, setFound] = useState<Order | null>(null)
    const { updateStatus } = useOrderHook()

    useEffect(() => {
        if (!orders.length) {
            getOrders()
        }
    }, [])

    useEffect(() => {
        const founded = orders.find(or => or.id === id)
        if (founded) {
            setFound(founded)
        }
    }, [orders])
    console.log(id)

    return (
        <div className='flex justify-center'>
            {
                found &&
                <div className=' border p-10 rounded-lg flex flex-col gap-4'>
                    <div>
                        <p className='font-semibold text-gray-500'>Id: {found.id}</p>
                        <p className={`bg-gray-800 p-1 w-fit rounded ${found.status == 'Pending' ? 'text-yellow-400' : found.status == 'Success' ? 'text-green-400' : 'text-red-500'}`}>{found.status}</p>
                    </div>

                    <div className='flex gap-2 flex-col'>
                        {
                            found.orderItems?.map(item => {
                                return (
                                    <div className='shadow-lg p-2 flex gap-2 items-center justify-between' key={item.id}>
                                        <Image alt='' src={item.product.image} width={60} height={60} quality={100} />
                                        <div className='text-sm max-w-[30%]'>
                                            <p>{item.product.name}</p>
                                        </div>
                                        <div className='text-sm max-w-[30%] justify-center text-center'>
                                            <p>cantidad:</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                        <div className='text-sm max-w-[30%] justify-center text-center'>
                                            <p>sub total:</p>
                                            <p>$ {item.subTotal}</p>
                                        </div>

                                    </div>
                                )
                            })
                        }
                        <div className='flex justify-between my-6'>
                            <div>
                                <p>Total Pedido:</p>
                                <p>$ {found.totalAmount.toFixed(2)}</p>
                            </div>
                            <div className='flex gap-2'>
                                <button onClick={()=> {updateStatus(found.id, 'Success')}} className='border p-1 rounded hover:bg-green-200 cursor-pointer'><TiTick className='size-6 text-green-600'/></button>
                                <button onClick={()=> {updateStatus(found.id, 'Canceled')}} className='border p-1 rounded hover:bg-red-200 cursor-pointer'><MdCancel className='size-6 text-red-500'/></button>
                            </div>
                        </div>

                    </div>
                </div>



            }
        </div>
    );
};

export default DetailSection;