'use client'

import MainContainer from '@/app/helpers/containers/MainContainer';
import React, { useEffect } from 'react';
import { ButtonBlue, File, HeaderAdmin, Input, TextArea } from '../../../components/admin/filesComponents';
import Image from 'next/image';
import { BlurModal } from '../../../components/modals/modals';
import useToogleOpenHook from '@/app/admin/hooks/toogleHooks';
import useCloudinary from '@/app/admin/hooks/CloudinaryHook';
import useCreateProductHook from '@/app/admin/hooks/createProduct.hook';
import ParentSearchModal from '../../../components/modals/parentSearchModal';
import CategorySelector from './categoriesSelector';
import useMainChargeHook from '@/app/hooks/mainCharge.hook';
import ProductCardRender from './productCardRender';
import { MdOutlineDeleteOutline } from 'react-icons/md';



const ProductCreateSection = () => {

    const { uploadToCloudinary, imageUrl } = useCloudinary()
    const { toogleOpen, status, close } = useToogleOpenHook()
    const { handleInput, input, setParent, handleCategory, setImage, submit, deletParent } = useCreateProductHook()
    const { initialCharge } = useMainChargeHook()

    useEffect(() => {
        if (imageUrl) {
            setImage(imageUrl)
        }
    }, [imageUrl])

    useEffect(() => {
        initialCharge(true)
    }, [])

    return (
        <MainContainer >
            <BlurModal status={status} close={close}>
                <ParentSearchModal label='Buscar Producto' model='product' close={close} handler={setParent} />
            </BlurModal>
            <HeaderAdmin title={'Crear Producto'} />
            <div className='grid md:grid-cols-2'>
                <div>
                    <h2 className='text-xl font-bold mt-1  w-fit p-1 rounded text-blue-500'>Formulario</h2>
                    <div className='flex  items-center'>
                        <ButtonBlue action={toogleOpen} label={'Relacionar Producto'} />
                        {
                            input.parent && (
                                <div className='flex items-center justify-center ml-2'>
                                    <Image src={input.parent.image} alt={input.parent.name} width={50} height={50} className='rounded-full' />
                                    <span className='ml-2 text-green-500 font-bold'>{input.parent.name}</span>
                                    <button onClick={deletParent}><MdOutlineDeleteOutline className='text-red-500 size-8 hover:text-red-900 cursor-pointer' /></button>
                                </div>
                            )
                        }
                    </div>

                    <Input name={'name'} label={'Nombre del producto'} value={input.name} handler={handleInput} type='text' />

                    <div className='grid md:grid-cols-2 gap-2 '>
                        <Input name={'price'} label={'Precio'} value={input.price.toString()} handler={handleInput} type='number' />
                        <Input name={'weight'} label={'Peso'} value={input.weight.toString()} handler={handleInput} type='number' />
                    </div>

                    <div className='grid md:grid-cols-2 gap-2 '>
                        <Input name={'image'} label={'URL de la imagen'} value={input.image} handler={handleInput} type='text' />
                        <Input name={'length'} label={'Longitud'} value={input.length.toString()} handler={handleInput} type='number' />
                    </div>

                    <TextArea rows={5} name={'description'} label={'Descripción'} value={input.description} handler={handleInput} />
                    <div>
                        <File callback={uploadToCloudinary} />
                    </div>
                    <div>
                        <CategorySelector handle={handleCategory} input={input} />
                    </div>
                    <div>
                        <ButtonBlue action={submit} label={'Crear Producto'} addClass='w-full mx-auto md:w-fit my-2 p-2' />
                    </div>
                </div>

                <ProductCardRender input={input} />


            </div>



        </MainContainer>
    );
};

export default ProductCreateSection;

