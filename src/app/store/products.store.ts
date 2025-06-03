import axios from 'axios';
import { create } from 'zustand';
import { Product } from '@/app/interfaces/modelsInterfaces';

interface AxiosResponse {
  ok?: true;
  error?: true;
  response: string | Product[];
}

export interface ProductStoreInterface {
  products: Product[];
  getProducts: () => Promise<boolean>;
}

export const useProductsStore = create<ProductStoreInterface>((set) => ({
  products: [],

  getProducts: async () => {
    try {
      const { data } = await axios.get<AxiosResponse>('/api/products');
      console.log('products store (línea 13)', data);

      if (data.ok && Array.isArray(data.response)) {
        set({ products: data.response });
        return true
      } else {
        console.warn('Respuesta inesperada en /api/products:', data);
        return false
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error en el products store (línea 14):', error.message);
      } else {
        console.error('Error desconocido al cargar productos:', error);
      }
      return false
    }
  },
}));