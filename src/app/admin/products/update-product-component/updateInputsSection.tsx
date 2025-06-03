import { ButtonBlue, File, HeaderAdmin, Input, TextArea } from '@/app/components/admin/filesComponents';
import { BlurModal } from '@/app/components/modals/modals';
import ParentSearchModal from '@/app/components/modals/parentSearchModal';
import React, { useEffect } from 'react';
import ProductCardRender from '../product-components/productCardRender';
import CategorySelector from '../product-components/categoriesSelector';
import useToogleOpenHook from '../../hooks/toogleHooks';
import useCloudinary from '../../hooks/CloudinaryHook';

const UpdateInputsSection = ({handleCategory, handleInput, setImage, setParent, input, submit, findProduct}) => {

    const {toogleOpen, status, close} = useToogleOpenHook()
    const {uploadToCloudinary, imageUrl} = useCloudinary()

    useEffect(()=>{
        setImage(imageUrl)
    },[imageUrl])

    useEffect(()=>{
        !input.name && findProduct 
    },[])

    return (
        <div>
            <BlurModal status={status} close={close}>
                <ParentSearchModal label='Buscar Productp' model='product' close={close} handler={setParent} />
            </BlurModal>
            <HeaderAdmin title={'Crear Producto'} />
            <div className='grid md:grid-cols-2'>
                <div>
                    <h2 className='text-xl font-bold mt-1  w-fit p-1 rounded text-blue-500'>Formulario</h2>

                    <ButtonBlue action={toogleOpen} label={'Relacionar Producto'} />

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
                </div>

                <ProductCardRender  input={input} />
                
                <div>
                    <File callback={uploadToCloudinary} />
                </div>

                <div>
                    <CategorySelector handle={handleCategory} input={input} />
                </div>
            </div>

            <div>
                <ButtonBlue action={submit} label={'Actualizar producto'} addClass='w-full mx-auto md:w-fit my-2 p-2' />
            </div>
        </div>
    );
};

export default UpdateInputsSection;