interface CartItem {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
    quantity: number;
    subTotal?: number;
}

//https://api.whatsapp.com/send?phone=${seller.phoneNumber}&text=${dataText}
function useWhatsappHook() {

    function generateWhatsappTemplate(cart, orderId: string): string {
        let template = `::::::PEDIDO::::::\nOrder ID: ${orderId}\n`;

        const cartItems = Object.values(cart) as CartItem[]

        cartItems.forEach((pr) => {
            const subTotal = pr.product.price * pr.quantity;
            template +=
                '\n' + pr.product.name.trim() +
                '\nUnidades: ' + pr.quantity +
                '\nSub Total: $ ' + subTotal.toFixed(2) +
                '\n-------------------------';
        });

        const total = Object.values<CartItem>(cart).reduce((acc, pr) => acc + pr.product.price * pr.quantity, 0).toFixed(2);
        template += `\n\nTotal a abonar: $ ${total}`;

        return `https://api.whatsapp.com/send?phone=+540111525420570&text=${encodeURIComponent(template)}`;
    }



    return {
        generateWhatsappTemplate
    }
}

export default useWhatsappHook