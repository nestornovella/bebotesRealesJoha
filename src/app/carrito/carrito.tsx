"use client"
import React, { useEffect, useState } from 'react';
import MainContainer from '../helpers/containers/MainContainer';
import { useCartStore } from '../store/cart.store';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CgMathMinus, CgMathPlus } from 'react-icons/cg';
import { ImWhatsapp } from 'react-icons/im';
import { IoSadOutline } from 'react-icons/io5';
import useCarrito from '../hooks/carrito.hook';
import useWhatsappHook from '../hooks/whatsapp.hook';

const Carrito = () => {
    const [animate, setAnimate] = useState(false);
    const { total } = useCarrito()
    const { cart, clearCart, addOne, restOne, deleteProduct } = useCartStore()
    const {link} = useWhatsappHook()

    useEffect(() => {
        setAnimate(true);
        const timeout = setTimeout(() => setAnimate(false), 1000); // igual duración que pulse
        return () => clearTimeout(timeout);
    }, [total]);

    console.log(cart, "cart")
    return (
        <MainContainer>
            {
                Object.keys(cart).length > 0 ?

                    <div>
                        <ul className=' max-h-[90%] overflow-y-scroll gap-2 grid xl:grid-cols-2'>
                            {
                                Object.values(cart).map(pr => {
                                    return <li className='relative border-b border-gray-300' key={pr.product.id}>
                                        <div className='flex justify-between gap-2 p-2 items-center w-full '>
                                            <Image className='size-[70px]' alt='' src={pr.product.image} quality={70} width={200} height={200} priority />
                                            <h2 className='text-xl w-[30%]'>
                                                {pr?.product?.name}
                                            </h2>

                                            <div className='flex flex-col gap-2 mx-2'>
                                                <button onClick={() => { addOne(pr.product.id as string) }} className='border rounded hover:bg-blue-400 hover:text-white font-bold p-1 size-7 flex justify-center items-center cursor-pointer'><CgMathPlus /></button>
                                                <button onClick={() => { restOne(pr.product.id as string) }} className='border rounded hover:bg-blue-400 hover:text-white font-bold p-1  size-7 flex justify-center items-center cursor-pointer'><CgMathMinus /></button>
                                            </div>

                                            <div className='flex flex-col items-center justify-center'>
                                                <p>Cantidad</p>
                                                <p>{pr.quantity}</p>
                                            </div>


                                            <div>
                                                <RiDeleteBin6Line onClick={() => { deleteProduct(pr.product.id as string) }} className='size-10 text-red-500 cursor-pointer hover:text-red-600' />
                                            </div>

                                        </div>
                                        
                                        <div className='flex text-lg'>
                                            <p>sub total: $</p>
                                            <p>{(pr.product.price * pr.quantity).toFixed(2)}</p>
                                        </div>


                                    </li>
                                })
                            }

                        </ul>
                        <div className={`flex gap-2 font-bold  items-center my-5 ${animate ? 'animate-bounce text-green-600' : ''}`}>
                            <h2 className="text-2xl">total: $</h2>
                            <h2 className="text-3xl">{total}</h2>
                        </div>

                        <div className='flex justify-center my-4'>
                            <button onClick={() => {
                                window.location.href = link as string
                                clearCart()
                            }} className="p-3  border-none rounded-full bg-[#25D366] text-white text-lg font-medium flex items-center justify-center gap-2 shadow-md hover:bg-[#1ebe5d] transition-all duration-300">
                                <ImWhatsapp className="text-2xl" /> Enviar Pedido
                            </button>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center h-full md:h-fit'>

                        <div className='flex gap-2 flex-wrap items-center justify-center'>
                            <h2 className='text-xl text-center text-gray-500 font-bold '>Ahun no has agregado productos al carrito de compras</h2>
                            <IoSadOutline className='size-10 text-gray-500' />
                        </div>
                        <Image src={"https://cdn-icons-png.flaticon.com/512/10967/10967193.png"} alt='' width={500} height={500} quality={100} />
                    </div>
            }


        </MainContainer>
    );
};

export default Carrito;