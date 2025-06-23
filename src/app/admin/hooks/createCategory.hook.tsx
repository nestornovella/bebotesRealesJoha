import { showToast } from '@/app/helpers/tostify';
import useMainChargeHook from '@/app/hooks/mainCharge.hook';
import { Category } from '@/app/interfaces/modelsInterfaces';
import axios, { isAxiosError } from 'axios';
import React, { useState } from 'react';

const useCreateCategoriesHook = () => {


    const [input, setinput] = useState<Category>({
        name: '',
        parentId: null,
        parent:null
    })

    const {recharge} = useMainChargeHook()

    function handlerInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        const name = e.target.name

        if (!name) showToast('Error de sistema se requiere intervencion', 'error')
        setinput(prev => ({ ...prev, [name]: value }))

    }
    console.log(input, 'category input')

    function setParent(category:Category | null = null){

        category && setinput((prev => ({...prev, parentId:category.id, parent:category})))
        !category && setinput(prev => ({...prev, parentId: null , parent:null}))
    }

    async function submit() {
        showToast('Creando categoria', 'info')
        if (!input.name.trim()) {
            showToast('El nombre de la categoría no puede estar vacío', 'error');
            return;
        }
        try {
           
            const { data } = await axios.post('/api/categories', input )
            if (data.error) throw new Error(data.response as string)
            if (data.ok) {
                setinput(prev => ({ ...prev, name: '' }))
                showToast('Se ha creado una nueva categoria', 'success')
                recharge()
            }
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error);
                showToast('Problemas en el sistema, contactar desarrollador', 'error');
            } else if (error instanceof Error) {
                showToast(error.message, 'error');
            }
        }
    }

    async function deleteCategory(id:string){
        try {
            const {data} = await axios.delete(`/api/categories/${id}`)
            if(data.error) throw new Error('no se logro eliminar la categoria')
            showToast('Categoria eliminada', 'success')
            recharge()
        } catch (error) {
            if(error instanceof Error){
                showToast(error.message, 'error')
            }

        }
    }


    return {
        input,
        handlerInput,
        submit,
        setParent,
        deleteCategory
    }
};

export default useCreateCategoriesHook;