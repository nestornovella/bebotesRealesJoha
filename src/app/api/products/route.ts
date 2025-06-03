import { Category, Product } from "@/app/interfaces/modelsInterfaces";
import { response } from "../helpers/helpers";
import { prismaClient } from "../helpers/prismaClient";
import { NextRequest } from "next/server";






export async function GET() {
    try {
        async function buildTree(productId: string | null = null) {
            const products = await prismaClient.product.findMany({
                where: { parentId: productId },
                include: {
                    parent: true,
                    categories: {
                        include: {
                            parent: true
                        }
                    },
                }
            })

            return Promise.all(products.map(async (product) => (
                {
                    ...product,
                    subProduct: await buildTree(product.id)
                }
            )))

        }
        const newProductTree = await buildTree()

        return response<Product[]>("ok", newProductTree)

    } catch (error) {

        if (error instanceof Error) {
            return response<string>("error", error.message)
        }
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json()
        delete body.parent

        const { image, name, price, categories, parentId } = body

        if (!image || !price || !name) throw new Error("faltan parametros obligatorios nombre precio o imagen")


        const newProduct = await prismaClient.product.create({
            data: {
                ...body,
                ...(categories?.length && {
                    categories: {
                        connect: categories.map((cat: Category) => ({ id: cat.id })),
                    },
                }),
                ...(parentId && {
                    parent: { connect: { id: parentId } }
                }
                )
            },
        });

        if (!newProduct) throw new Error("no se pudo crear el producto")

        return response<string>("ok", "Producto creado con exito")


    } catch (error) {
        if (error instanceof Error) {
            return response<String>("error", error.message)
        }
    }
}
export async function PUT(request: NextRequest) {
  try {
    
    const {id, name, image, categories, length, price, weight, active, description } = await request.json() as Product
    const update = await prismaClient.product.update({
      where: { id: id },
      data: {
        name,
        image,
        length,
        price,
        weight,
        active,
        description,
        categories: {
          set: categories.map((ct) => ({ id: ct.id })),
        },
      },
    });

    if (!update) throw new Error('no se logró actualizar el producto');

    return response('ok', 'producto actualizado');
  } catch (error) {
    if (error instanceof Error) {
      return response('error', error.message);
    }
    return response('error', 'error desconocido');
  }
}

