import Image from 'next/image';
import React from 'react';

const CardDelete = ({ pr, callback, toogle }) => {

    function handleDelete(){
        callback(pr)
        toogle()
    }

    return (
        <div onClick={handleDelete} className='flex border p-2 rounded items-center justify-around font-bold hover:animate-pulse hover:bg-red-500 hover:text-white cursor-pointer' key={pr.id}>
            <Image className='w-[80px] h-[80px] object-cover' alt='' src={pr.image} width={80} height={80} />
            <div>
                <h2>Eliminar...</h2>
                <h2 >{pr.name}</h2>
            </div>
        </div>
    );
};

export default CardDelete;