'use client'
import { useCartStore } from '@/app/store/cart.store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBagShopping } from 'react-icons/fa6';
import { RiAdminFill } from 'react-icons/ri';


const NavBar = () => {

    const { push } = useRouter()
    const {cart} = useCartStore()



    return (
        <div className='fixed w-full flex h-[70px] justify-between items-centerpx-3 md:px-20 xl:px-36 2xl:px-48 z-[100] backdrop-blur-3xl'>
            <div onClick={() => { push('/') }} className=' flex-col p size-[70px] relative rounded-full border cursor-pointer  p-9 bg-black text-white font-bold flex items-center justify-center'>
                <h2 className='text-sm '>Bebes</h2>
                <p className='text-sm'>Reales</p>
            </div>

            
            <div className='p-2 flex justify-center items-center cursor-pointer relative'>
                <FaBagShopping onClick={() => { push('/carrito') }} className='size-10 text-black' />
                <div className='bg-red-500 p-1 rounded-full size-6 text-center absolute bottom-1 right-1'>
                    <p className='text-white font-bold text-xs'>{Object.keys(cart).length}</p>
                </div>
            </div>
        </div>


    );
};

export default NavBar;