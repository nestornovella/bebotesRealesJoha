import { Category, Product } from "@/app/interfaces/modelsInterfaces";
import { response } from "../helpers/helpers";
import { prismaClient } from "../helpers/prismaClient";
import { NextRequest } from "next/server";

type ProductNode = Omit<Product, "parent" | "subProduct"> & {
    parent?: Partial<ProductNode> | null;
    categories: Category[];
    subProduct: ProductNode[];
};


export async function GET() {
    try {
        const allProducts = await prismaClient.product.findMany({
            include: {
                parent: true,
                categories: {
                    include: {
                        parent: true,
                    },
                },
            },
        });

        const productMap = new Map<string, ProductNode>();

        for (const prod of allProducts) {
            productMap.set(prod.id, {
                ...prod,
                subProduct: [],
            });
        }

        const tree: ProductNode[] = [];

        for (const prod of allProducts) {
            const node = productMap.get(prod.id)!;
            if (prod.parentId) {
                const parentNode = productMap.get(prod.parentId);
                parentNode?.subProduct.push(node);
            } else {
                tree.push(node);
            }
        }

        return response<ProductNode[]>("ok", tree);
    } catch (error) {
        if (error instanceof Error) {
            return response<string>("error", error.message);
        }
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image, name, price, categories, parentId } = body;

        if (!image || !price || !name)
            throw new Error("Faltan parámetros obligatorios: nombre, precio o imagen");

        const newProduct = await prismaClient.product.create({
            data: {
                name,
                image,
                price,
                ...(body.length && { length: body.length }),
                ...(body.weight && { weight: body.weight }),
                ...(body.description && { description: body.description }),
                ...(categories?.length && {
                    categories: {
                        connect: categories.map((cat: Category) => ({ id: cat.id })),
                    },
                }),
                ...(parentId && {
                    parent: { connect: { id: parentId } },
                }),
            },
            include: {
                subProduct: true
            }
        });

        if (!newProduct) throw new Error("No se pudo crear el producto");

        return response<string>("ok", "Producto creado con éxito");
    } catch (error) {
        if (error instanceof Error) {
            return response<string>("error", error.message);
        }
    }
}

export async function PUT(request: NextRequest) {
    try {

        const { id, name, image, categories, length, price, weight, active, description } = await request.json() as Product
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

