'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBagShopping } from 'react-icons/fa6';
import { RiAdminFill } from 'react-icons/ri';


const NavBar = () => {

    const { push } = useRouter()

    return (
        <div className='fixed w-full flex h-[70px] justify-between items-centerpx-3 md:px-20 xl:px-36 2xl:px-48 z-[100] backdrop-blur-3xl'>
            <div onClick={() => { push('/') }} className=' flex-col p size-[70px] relative rounded-full border cursor-pointer  p-9 bg-black text-white font-bold flex items-center justify-center'>
                <h2 className='text-sm '>Bebes</h2>
                <p className='text-sm'>Reales</p>
            </div>

            
            <div className='p-2 flex justify-center items-center cursor-pointer'>
                <FaBagShopping onClick={() => { push('/carrito') }} className='size-10 text-blue-500' />
            </div>
        </div>


    );
};

export default NavBar;