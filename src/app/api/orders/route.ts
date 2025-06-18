import { Product } from "@/app/interfaces/modelsInterfaces";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../helpers/prismaClient";
import { response } from "../helpers/helpers";


interface CartItem {

    product: Product,
    quantity: number,
}

interface Items {
    items: CartItem[]
}

export async function POST(request: NextRequest) {

    try {
        const { items }: Items = await request.json()

        if(!Array.isArray(items) || items.length < 1 ) throw new Error('el carrito esta vacio o mal formado')

        const order = await prismaClient.order.create({ data: {} })


        const ItemsList = await Promise.all(
            items.map( (item: CartItem) => {
                return  prismaClient.orderItem.create({
                    data: {
                        price: item.product.price,
                        quantity: item.quantity,
                        subTotal: +(item.product.price * item.quantity).toFixed(2),
                        product: {
                            connect: {
                                id: item.product.id
                            }
                        },
                        order: {
                            connect: {
                                id: order.id
                            }
                        }
                    }
                })
            })
        )

        const total = ItemsList.reduce((prev, current) => prev + +(current.subTotal).toFixed(2), 0);
        const updatedOrder = await prismaClient.order.update({
            where: { id: order.id },
            data: { totalAmount: total },
            include:{
                orderItems:{
                    include:{
                        product:true
                    }
                }
            }
        });
      

        return response("ok", updatedOrder)
    } catch (error) {

        if(error instanceof Error)
        return response('error', error.message)

        else return response('error', 'error de servidor desconocido')
    }

}



export async function GET() {
    

    try {
        const orders = await prismaClient.order.findMany({
            include:{
                orderItems:{
                    include:{
                        product:true
                    }
                }
            }
        })
        return response('ok', orders) 

    }  catch (error) {

        if(error instanceof Error)
        return response('error', error.message)

        else return response('error', 'error de servidor desconocido')
    }
}