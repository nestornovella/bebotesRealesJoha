import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../interfaces/modelsInterfaces';
import { showToast } from '../helpers/tostify';



export type GetCart = Record<string, { product: Product; quantity: number; subTotal:number }>
interface CartSetProps {
  cart: Record<string, { product: Product; quantity: number; subTotal: number } >;
  addToCart: (id: string, product: Product, quantity?: number) => void;
  getCart: () => Record<string, { product: Product; quantity: number; subTotal: number }>;
  deleteProduct: (id: string) => void
  addOne: (id: string) => void
  restOne: (id: string) => void
  clearCart:()=> void
}

export const useCartStore = create<CartSetProps>()(
  persist(
    (set, get) => ({
      cart: {},

      getCart: () => {
        return get().cart;
      },

      addToCart: (id, product, quantity = 1) => {
        set((state) => ({
          cart: {
            ...state.cart,
            [id]: {
              product,
              quantity: state.cart[id] ? state.cart[id].quantity + quantity : quantity,
              subTotal: state.cart[id] ? (state.cart[id].quantity + quantity) * state.cart[id].product.price : product.price * quantity
            },
          },
        }));
        showToast('producto agregado', 'success')
        showToast(`producto: ${product.name}`,'info')

      },

      addOne: (id) => {
        set((state)=>{
          return {
            cart:{
              ...state.cart,
              [id]:{
                product: state.cart[id].product,
                quantity: state.cart[id].quantity +1,
                subTotal: (state.cart[id].quantity +1) * state.cart[id].product.price
              }
            }
          }
        })
      },


      restOne:(id)=>{
        set((state)=>{

          return {
            cart:{
              ...state.cart,
              [id]:{
                ...state.cart[id],
                quantity: state.cart[id].quantity < 2 ? state.cart[id].quantity : state.cart[id].quantity -1,
                subTotal: state.cart[id].quantity < 2 ? state.cart[id].product.price : (state.cart[id].quantity -1) * state.cart[id].product.price
              }
            }
          }
        })
      },

      deleteProduct(id) {

        set((state) => {
          if (!state.cart[id]) return state;
          const newCart = { ...state.cart }
          delete newCart[id]

          return {
            cart: newCart
          }
        })

      },

      clearCart:()=>{
        set(()=>{
          return {
            cart:{}
          }
        })

      }

    }),
    {
      name: 'cart', // El nombre para el almacenamiento en localStorage
      partialize: (state) => ({ cart: state.cart }), // Guardar solo la propiedad 'cart'

    }
  )
);
