import { ButtonBlue, File, HeaderAdmin, Input, TextArea } from '@/app/components/admin/filesComponents';
import { BlurModal } from '@/app/components/modals/modals';
import ParentSearchModal from '@/app/components/modals/parentSearchModal';
import React, { useEffect } from 'react';
import ProductCardRender from '../product-components/productCardRender';
import CategorySelector from '../product-components/categoriesSelector';
import useToogleOpenHook from '../../hooks/toogleHooks';
import useCloudinary from '../../hooks/CloudinaryHook';
import Image from 'next/image';

const UpdateInputsSection = ({ handleCategory, handleInput, setImage, setParent, input, submit, findProduct }) => {

    const { toogleOpen, status, close } = useToogleOpenHook()
    const { uploadToCloudinary, imageUrl } = useCloudinary()

    useEffect(() => {
        setImage(imageUrl)
    }, [imageUrl])

   

    return (
        <div>
            <BlurModal status={status} close={close}>
                <ParentSearchModal label='Buscar Productp' model='product' close={close} handler={setParent} />
            </BlurModal>
            <HeaderAdmin title={'Crear Producto'} />
            <div className='grid md:grid-cols-2'>
                <div>
                    <h2 className='text-xl font-bold mt-1  w-fit p-1 rounded text-blue-500'>Formulario</h2>
                    <div>
                        <ButtonBlue action={toogleOpen} label={'Relacionar Producto'} />
                        {
                            input.parent && (
                                <div onClick={()=> {findProduct(input.parent.id)}} className='cursor-pointer flex items-center justify-center ml-2'>
                                    <img src={input.parent.image} alt={input.parent.name} width={50} height={50} className='rounded-full' />
                                    <span className='ml-2 text-green-500 font-bold'>{input.parent.name}</span>
                                    
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
                        {
                            input.subProduct && input.subProduct.length > 0 && (
                                <div className='flex  flex-col '>
                                    <h2 className='text-green-500 font-bold'>Subproductos: </h2>
                                    <ul className='ml-2 flex items-center '>
                                        {input.subProduct.map((sub, index) => (
                                            <li key={index} className='flex items-center mb-2 my-2 '>
                                                <div className='border-3 border-transparent cursor-pointer p-1 hover:border-blue-700 rounded-full  size-18'>
                                                    <Image onClick={()=> {findProduct(sub.id)}} src={sub.image} alt={sub.name} width={70} height={70} className="rounded-full inline-block mr-2 " />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <CategorySelector handle={handleCategory} input={input} />
                    </div>
                    <div>
                        <ButtonBlue action={submit} label={'Actualizar producto'} addClass='w-full mx-auto md:w-fit my-2 p-2' />
                    </div>
                </div>

                <ProductCardRender input={input} />


            </div>

        </div>
    );
};

export default UpdateInputsSection;