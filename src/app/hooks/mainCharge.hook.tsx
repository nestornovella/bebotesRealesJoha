import { useProductsStore } from '../store/products.store';
import { useCategoriesStore } from '../store/categories.store';
import { showToast } from '../helpers/tostify';


const useMainChargeHook = () => {


    const { getProducts, products } = useProductsStore()
    const { categories, getCategories } = useCategoriesStore()

    function initialCharge(info = false) {
        
        if (!categories.length || !products.length) {
            info && showToast('cargando modelos, espere...', 'info')
            getCategories()
                .then(response => {
                    response && !products.length && getProducts()
                    .then(response => {response && info && showToast('modelos cargados con exito', 'success')})
                })
        }
    }

    function recharge() {
        showToast('cargando modelos, espere...', 'info')
        getCategories()
            .then(response => {
                response && getProducts()
                    .then(response => { response && showToast('modelos cargados con exito', 'success') })
            })
    }

    return {
        recharge,
        initialCharge
    };

};

export default useMainChargeHook;