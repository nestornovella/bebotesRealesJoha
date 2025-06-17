'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { CgMail } from 'react-icons/cg';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';

const Footer = () => {

    const { push } = useRouter()


    return (
        <div className='flex flex-col md:flex-row font-semibold justify-center  md:justify-between gap-5 px-3 md:px-20 xl:px-36 2xl:px-48  min-h-[70px] w-screen bg-black py-2'>
            <div className={``}>
                <p className=' text-lg font-bold text-blue-400'>Desarrollos Novella </p>
                <div className='flex gap-1 text-white'>
                    <TiTick />
                    <p >Paginas Web</p>
                </div>

                <div className='flex gap-1 text-white'>

                    <TiTick />
                    <p className='text-white'>E-commerce</p>
                </div>

                <div className='flex gap-1 text-white'>

                    <TiTick />
                    <p className='text-white'>Sistemas de gestion</p>
                </div>

                <div className='flex gap-1 text-white'>

                    <TiTick />
                    <p className='text-white'>Software empresarial</p>
                </div>

            </div>

            <div className='flex flex-col gap-1 text-white'>
                <div className=''>
                    <p className='font-bold'>Contacto</p>
                    <div className='flex gap-2 py-2'>
                        <FaPhoneAlt />
                        <p>+54 11-2505 3297</p>
                    </div>
                    <div className='flex gap-1 py-2'>
                        <CgMail className='font-bold size-6 ' />
                        <p className='font-semibold'>nestornovellafullstackdev@gmail.com</p>
                    </div>
                </div>
            </div>

            <div onClick={() => { push('/admin') }} className='h-[100px] flex justify-center items-center cursor-pointer text-white hover:text-green-400'>
                <RiAdminFill className=' size-10' />
            </div>
        </div>

    );
};

export default Footer;