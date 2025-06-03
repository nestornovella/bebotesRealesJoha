'use client'

import MainContainer from '@/app/helpers/containers/MainContainer';
import React, { useEffect } from 'react';
import { ButtonBlue, HeaderAdmin, Input } from '../../../components/admin/filesComponents';
import useCreateCategoriesHook from '@/app/admin/hooks/createCategory.hook';
import { showToast } from '@/app/helpers/tostify';
import { BlurModal } from '../../../components/modals/modals';
import useToogleOpenHook from '@/app/admin/hooks/toogleHooks';
import ParentSearchModal from '../../../components/modals/parentSearchModal';
import useMainChargeHook from '@/app/hooks/mainCharge.hook';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const CategoriesSection = () => {

    const { input, handlerInput, submit, setParent } = useCreateCategoriesHook()
    const { status, toogleOpen, close } = useToogleOpenHook()

    const { initialCharge } = useMainChargeHook()

    useEffect(() => {
        initialCharge(true)
    }, [])

    return (
        <MainContainer>
            <HeaderAdmin title={'Crear Categoria'} />
            <div>
                <h2 className='text-xl font-bold mt-1  w-fit p-1 rounded text-blue-500'>Formulario</h2>
                <div className='flex gap-2 '>
                    <ButtonBlue action={toogleOpen} label={'Relacionar Categoria'} />
                    {
                        input.parent &&
                        <button
                        onClick={() => {setParent()}}
                            className='border p-1 rounded bg-red-600 text-white font-bold 
                        flex gap-1 items-center justify-center cursor-pointer hover:bg-red-800' >
                            {input.parent?.name}
                            <MdOutlineDeleteOutline /> </button>
                    }
                </div>

                <BlurModal status={status} close={close}>
                    <ParentSearchModal label='Categoria Padre' model='category' handler={setParent} close={close} />
                </BlurModal>
                <div>
                    <Input name={'name'} label={'Nombre de nueva categoria'} type='text' value={input.name} handler={handlerInput} />
                </div>

                <ButtonBlue action={submit} label={'Crear Categoria'} addClass='my-3' />


            </div>


        </MainContainer>
    );
};

export default CategoriesSection;