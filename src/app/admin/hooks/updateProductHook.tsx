import { showToast } from '@/app/helpers/tostify';
import { Category, Product } from '@/app/interfaces/modelsInterfaces';
import { useProductsStore } from '@/app/store/products.store';
import axios, { isAxiosError } from 'axios';
import React, { useState } from 'react';

const useUpdateProduct = () => {

    const { products } = useProductsStore()

    const [input, setInput] = useState<Product>({
        name: '',
        price: 0,
        image: '',
        length: 0,
        weight: 0,
        description: '',
        categories: [],
        parentId: null,
        parent: null,
        subProduct: []
    })

    function setParent(product) {
        setInput((prev) => ({ ...prev, parentId: product.id, parent: product }))
    }

    function setImage(image: string) {
        setInput(prev => ({ ...prev, image: image }))
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;

        if (!name) return;

        setInput(prev => {
            let newValue: string | Category[] | number | null = value;

            if (name === 'price' || name === 'length' || name === 'weight') {
                newValue = Number(value);
            }

            if (name === 'parentId') {
                newValue = value === '' ? null : value;
            }
            return {
                ...prev,
                [name]: newValue
            };
        });
    }


    function handleCategory(category: Category[]) {
        setInput(prev => ({ ...prev, categories: category }))
    }


    function findRecursive(products, id) {
        for (const pr of products) {
            if (pr.id === id) {
                return pr;
            }

            if (pr.subProduct && pr.subProduct.length > 0) {
                const found = findRecursive(pr.subProduct, id);
                if (found) return found;
            }
        }

        return null; // por si no lo encuentra
    }
    function findProduct(id: string) {

        const productFound = findRecursive(products, id)
        productFound && setInput(prev => ({ ...prev, ...productFound }))
    }

    async function submit() {
        try {
            showToast('creando producto', 'info')
            const { data } = await axios.put('/api/products', input)
            if (data.error) throw new Error(data.response)
            showToast('Producto creado con exito', 'success')
        } catch (error) {
            if (isAxiosError(error)) {
                console.log('error de axios:', error)
                showToast('Error de sistema', 'error')
            } else if (error instanceof Error) {
                showToast(error.message, 'error')
                console.log(error.message)
            }
        }
    }

    return {
        findProduct,
        handleCategory,
        handleInput,
        setParent,
        setImage,
        input,
        submit
    }
};

export default useUpdateProduct;