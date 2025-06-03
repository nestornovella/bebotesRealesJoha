import { Product } from '@/generated/prisma';
import React from 'react';

const DeleteModalConfirrm = ({ toogle, handle, product }: { toogle, handle, product: Product | null }) => {
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <div className='flex justify-center items-center flex-col my-[70px] border w-fit p-4 rounded bg-gray-200'>
                <h2 className='text-xl font-semibold'>
                    Desea <span className='text-red-600'>"Eliminar"</span> el producto:
                </h2>
                <h2 className='text-xl font-bold text-blue-600'>
                    {'"' + product?.name+ '"'}
                </h2>
                <div className='flex gap-2 my-2'>
                    <button className='border p-1 rounded font-bold cursor-pointer hover:bg-red-500 hover:text-white'  onClick={() => { handle(product?.id) }}>Eliminar</button>
                    <button className='border p-1 rounded font-bold cursor-pointer hover:bg-blue-500 hover:text-white' onClick={toogle}>Cancelar</button>
                </div>
            </div>

        </div>
    );
};

export default DeleteModalConfirrm;