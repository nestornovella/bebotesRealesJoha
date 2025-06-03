import React, { useRef, useState } from 'react';
import Styles from '../admin/styles.module.css'
import { useProductsStore } from '@/app/store/products.store';
import { useCategoriesStore } from '@/app/store/categories.store';
import { Category, Product } from '@/app/interfaces/modelsInterfaces';
import CategoryCardModal from './modalComponents/categoriesCard';
import ProductCardModal from './modalComponents/productCard';

const ParentSearchModal = ({ label, model, handler, close }: { label: string, model: 'product' | 'category',handler, close }) => {
    const [elements, setElements] = useState<Product[] | Category[]>([])
    const { products } = useProductsStore()
    const { categories } = useCategoriesStore()
    const ref = useRef<HTMLInputElement>(null)

   function filterData(data: Product[] | Category[], name: string) {
    const cleanName = name.toLowerCase().trim();

    if (!cleanName) {
        setElements([]);
        return;
    }

    if (cleanName === 'todo') {
        setElements(data);
        return;
    }

    const founded = data.filter(pr => pr.name.toLowerCase().includes(cleanName));

    setElements(founded);
}

    //agregar funcion
    const find = {
        product: (e: React.ChangeEvent<HTMLInputElement>) => {
            filterData(products, e.target.value)
        },
        category: (e: React.ChangeEvent<HTMLInputElement>) => {
            filterData(categories, e.target.value)
        }
    }
    //agregar card de renderizado
    const cardModel = {
        category: (cat: Category) => <CategoryCardModal key={cat.id} category={cat} handle={handler} close={toClose} />,
        product: (prod: Product) => <ProductCardModal key={prod.id} product={prod} handle={handler} close={toClose} />

        
    }

    function toClose(){
        close()
        ref.current && (ref.current.value = '');

    }

    return (
        <div onClick={(e) => { e.stopPropagation() }} className="flex flex-col xl:w-[70%] m-auto border rounded-lg p-2 ">
            <label className={`${Styles.label} text-sm translate-y-2.5 bg-white w-fit px-1 ml-2 font-bold text-gray-500`} htmlFor="">{label}</label>
            <input ref={ref}  onChange={(e) => { find[model](e) }} className={`${Styles.input} border rounded p-1`} />

            {

                !elements.length
                    ?
                    <div className='my-2'>
                        <h2 className='text-sm'>Ups no hay nada por aqui....</h2>
                    </div>
                    :
                    <div>
                        {
                            elements.map((el) => {
                                return cardModel[model](el)
                            })
                        }
                    </div>
            }
        </div>
    );
};

export default ParentSearchModal;