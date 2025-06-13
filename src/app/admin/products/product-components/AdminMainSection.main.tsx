'use client'

import { HeaderAdmin } from '@/app/components/admin/filesComponents'
import MainContainer from '@/app/helpers/containers/MainContainer'
import { useAuthStore } from '@/app/store/auth.store'
import { useCategoriesStore } from '@/app/store/categories.store'
import { useProductsStore } from '@/app/store/products.store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AuthSection from './authSection'

const AdminMainSection = () => {
  const { pass, getPass } = useAuthStore()
  const router = useRouter()
  const { getProducts } = useProductsStore()
  const { getCategories } = useCategoriesStore()

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && getPass().authorizated) {
      getProducts().then(response => {
        if (response) {
          getCategories()
        }
      })
    }
  }, [pass, hasMounted]) // dependemos también de hasMounted

  const className =
    'p-2 border font-bold border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer'

  function route(route: string) {
    router.push(route)
  }

  if (!hasMounted) {
    // Evitar render prematuro en SSR/rehidratación
    return null
  }

  return (
    <MainContainer>
      <HeaderAdmin title={'Menu Principal'} />
      {!getPass().authorizated ? (
        <div>
          <AuthSection />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full h-full mt-4">
          {/* Columna 1 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-blue-600 text-xl font-semibold mx-auto">Productos</h2>
            <button onClick={() => route('/admin/products')} className={className}>
              Crear Productos
            </button>
            <button onClick={() => route('/admin/products/delete')} className={className}>
              Eliminar Productos
            </button>
            <button onClick={() => route('/admin/products/update')} className={className}>
              Actualizar Productos
            </button>
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-blue-600 text-xl font-semibold mx-auto">Categorias</h2>
            <button onClick={() => route('/admin/categories')} className={className}>
              Crear Categorías
            </button>
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-blue-600 text-xl font-semibold mx-auto">Ordenes</h2>
            <button onClick={() => route('/admin/orders')} className={className}>
              Administrar Órdenes
            </button>
          </div>
        </div>
      )}
    </MainContainer>
  )
}

export default AdminMainSection
