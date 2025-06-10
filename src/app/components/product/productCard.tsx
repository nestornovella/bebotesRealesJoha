import { Product } from '@/app/interfaces/modelsInterfaces';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRulerCombined } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { GiWeight } from 'react-icons/gi';

// Color pastel fijo por categoría
export const getPastelColorFromString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 40%)`;
};

const ProductCard = ({ product }: { product: Product }) => {
  const categoryName = product.categories[0]?.name || 'default';
  const pastelColor = getPastelColorFromString(categoryName);
  const { push } = useRouter()

  return (
    <div onClick={()=>{push('/' + product.id)}} className='relative p-2 hover:border border-transparent hover:border-gray-400  flex justify-center rounded flex-col cursor-pointer items-center w-full'>
      <div
        className='w-fit p-1 rounded absolute top-0 left-2 text-white font-semibold'
        style={{ backgroundColor: pastelColor }}
      >
        <h2>{categoryName}</h2>
      </div>
      <div>
        <Image className='size-[150px] object-cover ' alt='' src={product?.image} width={100} height={100} quality={100} />
      </div>
      <div className='my-2'>
        <h2 className='text-lg font-bold text-gray-500'>{product.name}</h2>
        <p className='text-sm font-semibold text-gray-500'>Las imágenes son de carácter ilustrativo. Contactar antes para consultar stock disponible.</p>
      </div>
      <div className='w-full flex gap-2 text-gray-500 border-gray-400'>
        <div className='flex w-full p-1 rounded-lg gap-1'>
          <FaMoneyBill1Wave className='text-green-600 size-6' />
          <h2>{product.price}</h2>
        </div>
        <div className='flex w-full p-1 rounded-lg gap-1'>
          <GiWeight className='text-gray-900' />
          <h2>{product.weight} Gr</h2>
        </div>
        <div className='flex w-full p-1 rounded-lg gap-1'>
          <FaRulerCombined className='text-yellow-500' />
          <h2>{product.length} Cm</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
