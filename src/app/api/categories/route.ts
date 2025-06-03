import { Category } from "@/app/interfaces/modelsInterfaces";
import { response } from "../helpers/helpers";
import { prismaClient } from "../helpers/prismaClient";
import { NextRequest } from "next/server";





export async function GET() {

    try {

        async function buildTree(parentId: string | null = null) {

            const categories = await prismaClient.category.findMany({
                where: {
                    parentId: parentId
                },
                include: {
                    parent: true
                }
            })

            return Promise.all(categories.map(async (cat) => ({
                ...cat,
                subCategories: await buildTree(cat.id)
            })))
        }
        const categories = await buildTree()
        if(!categories) throw new Error('no se pudo acceder a las categorias (linea 30)')
        return response<Category[]>("ok", categories)
    } catch (error) {
        if (error instanceof Error) {
            return response<String>("error", error.message)
        }
    }
}


export async function POST(request: NextRequest) {
    try {
        const { name, parentId } = await request.json() as Category
        if (!name) throw new Error('se requiere el nombre')

        const newCategory = await prismaClient.category.create({
            data: {
                name,
                ...(parentId && {
                    parent: {
                        connect: { id: parentId }
                    }
                })
            }
        })

        if (newCategory) {
            return response<string>("ok", "Categoria creada con exito")
        }

        throw new Error("no se logre crear la categoria")

    } catch (error) {
        if (error instanceof Error) {
            return response<string>("error", error.message)
        }
    }
}