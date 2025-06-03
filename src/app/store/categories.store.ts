import { create } from 'zustand';
import { Category } from '../interfaces/modelsInterfaces';
import axios from 'axios';

export interface CategoriesStoreInterface {
  categories: Category[];
  getCategories: () => Promise<boolean>;
}

interface AxiosResponse {
  ok?: true;
  error?: true;
  response: string | Category[];
}

export const useCategoriesStore = create<CategoriesStoreInterface>((set) => ({
  categories: [],

  getCategories: async () => {
    try {
      const { data } = await axios.get<AxiosResponse>('/api/categories');
      console.log('categorías desde store (línea 12)', data);

      if (data.ok && Array.isArray(data.response)) {
        set({ categories: data.response });
        return true;
      }

      console.warn('Respuesta inesperada en /api/categories:', data);
      return false;

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al cargar categorías (línea 12):', error.message);
      } else {
        console.error('Error desconocido al cargar categorías (línea 12):', error);
      }
      return false;
    }
  },
}));
