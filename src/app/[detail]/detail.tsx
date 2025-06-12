import React, { Ref, RefObject, useRef } from 'react';
import { Product } from '../interfaces/modelsInterfaces';
import MainContainer from '../helpers/containers/MainContainer';
import Image from 'next/image';
import { IoCart } from 'react-icons/io5';
import { useCartStore } from '../store/cart.store';
import { useRouter } from 'next/navigation';
import { MdDeleteForever } from 'react-icons/md';

const Detail = ({ product }: { product: Product }) => {

    const { addToCart, cart, deleteProduct } = useCartStore()
    const {push} = useRouter()
    function addButtons() {
        const buttons: React.ReactElement<HTMLButtonElement>[] = []

        console.log(cart)

        for (let i = 1; i <= 20; i++) {
            buttons.push(
                <button onClick={() => { addToCart(product.id as string, product, i) }} key={i} className='p-2 py-3 border text-2xl font-bold hover:border-red-600 hover:bg-blue-400 hover:text-white cursor-pointer'>{i}</button>
            )
        }

        return buttons

    }

    const ref = useRef<HTMLInputElement>(null)

    return (
        <MainContainer>

            {product
                &&
                <div className='text-center md:text-start grid md:grid-cols-2 pb-10'>
                    {
                        //cols 1
                    }
                    <div className='px-4'>
                        <div className='flex gap-2 items-center justify-between'>
                            <div className='p-1 px-2 w-fit text-xl  overflow-hidden rounded-xl'>
                                <h1 className='text-black text-xl  font-bold overflow-hidden'>precio ${product.price}</h1>
                            </div>
                            <div className='p-1 px-2   overflow-hidden  flex justify-center w-fit items-center gap-2'>
                                <IoCart className='text-black size-7' />
                                <p className='text-black font-bold overflow-hidden'>{cart[product.id as string]?.quantity}</p>
                            </div>

                        </div>


                        <div className='flex justify-center'>
                            <Image alt='' priority src={product.image} width={500} height={500} quality={100} />
                        </div>

                        <div>
                            <h1 className='font-semibold'>{product.name}</h1>
                        </div>

                        <div>
                            <p className='text-black'>{product.description}</p>
                        </div>



                    </div>

                    {
                        //cols 2
                    }

                    <div className='xl:px-10'>

                        <div>
                            <div className='text-center py-2'>
                                <p className='font-semibold'>Agregar productos al carrito</p>
                            </div>
                            <div className='grid grid-cols-3 gap-1  my-4'>
                                {
                                    addButtons().map(bt => {
                                        return bt
                                    })
                                }
                                <div onClick={()=>{deleteProduct(product.id as string)}} className='p-1 px-2   overflow-hidden bg-black  flex justify-center w-full items-center gap-2 cursor-pointer'>
                                    <MdDeleteForever className='size-7 text-red-500' />
                                    <IoCart className='text-white size-7' />
                                    <p className='text-white font-bold overflow-hidden'>{cart[product.id as string]?.quantity}</p>
                                </div>

                            </div>

                            <div>
                                <p>Ingrese la cantidad Que desea agregar al carrito</p>
                                <div className='flex gap-2 my-4 mb-10'>
                                    <input ref={ref} type="number" className='border w-full p-2 font-semibold' placeholder='ingrese un valor si la cantidad es mayor a las digitadas' />
                                    <button onClick={()=>{
                                        addToCart(product.id as string, product, Number(ref.current?.value))
                                        if(ref.current) ref.current.value = ''
                                        }} className='border p-1'>Agregar al carrito</button>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <p>Si desea modificar las cantidades o quitar productos puede hacerlo desde el </p>
                                    <button onClick={()=>{push('/carrito')}} className='border rounded p-2 cursor-pointer hover:bg-blue-400 hover:text-white font-semibold'>carrito</button>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>

            }
        </MainContainer>
    );
};

export default Detail;