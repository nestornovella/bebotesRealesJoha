import Image from 'next/image';
import React from 'react';

const ProductCardRender = ({ input }) => {
    console.log(input)
    return (
        <div className='flex flex-col p-2 items-center w-full'>
            <h2 className='text-xl font-bold mt-1 text-start w-full  p-1 rounded text-blue-500'>Preview</h2>
            <div className='w-full'>
                <Image className='md:size-[70%] size-full mx-auto object-scale-down ' alt='' src={ input.image ? input.image : 'https://previews.123rf.com/images/koblizeek/koblizeek2208/koblizeek220800128/190320173-sin-s%C3%ADmbolo-de-vector-de-imagen-falta-el-icono-disponible-no-hay-galer%C3%ADa-para-este-marcador-de-posic.jpg'} width={200} height={200} quality={100} />
            </div>
            <div className='grid md:grid-cols-4 gap-2 w-full px-5 md:px-2'>
                <div className='flex  flex-col'>
                    <p className='text-gray-700 font-bold mb-1'>nombre:</p>
                    <h2> {input.name ? input.name : <p className='text-red-600'>se requiere nombre</p>}</h2>
                </div>
                <div className='flex  flex-col'>
                    <p className='text-gray-700 font-bold mb-1'>precio:</p>
                    <h2> {input.price ? input.price : <p className='text-red-600'>se requiere precio</p>}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='text-gray-700 font-bold mb-1'>peso:</p>
                    <h2> {input.weight ? input.weight : <p className='text-red-600'>se requiere peso</p>}</h2>
                </div>
                <div className='flex flex-col'>
                    <p className='text-gray-700 font-bold mb-1'>largo:</p>
                    <h2> {input.length ? input.length : <p className='text-red-600'>se requiere largo</p>}</h2>
                </div>
            </div>
            <div className='flex flex-col w-full justify-center items-center my-2'>
                <p className='text-gray-700 font-bold mb-1'>descripcion:</p>
                <h2> {input.description ? input.description : <p className='text-yellow-600'>se recomienda una descripcion</p>}</h2>
            </div>

        </div>
    );
};

export default ProductCardRender;