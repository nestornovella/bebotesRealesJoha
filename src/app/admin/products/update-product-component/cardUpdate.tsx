'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React from 'react';

const CardUpdate = ({ pr }) => {

    const {push} = useRouter()

   

    return (
        <div onClick={()=> push('/admin/products/update/' + pr.id)} className='flex border p-2 rounded items-center justify-around font-bold hover:animate-pulse hover:bg-green-500 hover:text-white cursor-pointer' key={pr.id}>
            <Image className='w-[80px] h-[80px] object-cover' alt='' src={pr.image} width={80} height={80} />
            <div>
                <h2>Actualizar...</h2>
                <h2 >{pr.name}</h2>
            </div>
        </div>
    );
};

export default CardUpdate;