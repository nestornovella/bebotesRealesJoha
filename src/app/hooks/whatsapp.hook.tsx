import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cart.store';


//https://api.whatsapp.com/send?phone=${seller.phoneNumber}&text=${dataText}
function useWhatsappHook() {

    const {cart} = useCartStore()
   
    
    const [link, setLink] = useState<string | null>(null)

    useEffect(()=>{
        let template = `::::::PEDIDO::::::\n`
        Object.values(cart).forEach(pr => { template += '\n' + pr.product.name.trim() + '\nUnidades: ' + pr.quantity + '\nSub Total: ' + '$ ' +  pr.subTotal + '\n-------------------------'})
        template += '\n\n Total a abonar: $ ' + (Object.values(cart).reduce((prev, curr) => prev + curr.subTotal,0)).toFixed(2)
        setLink(`https://api.whatsapp.com/send?phone=+540111525420570&text=${encodeURIComponent(template)}`)
    }, [cart])



    

    return {
        link
    }
}

export default useWhatsappHook