import { Category } from "@/app/interfaces/modelsInterfaces";
import { response } from "../helpers/helpers";
import { prismaClient } from "../helpers/prismaClient";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    // Traemos todas las categorías de una sola vez
    const allCategories = await prismaClient.category.findMany({
      include: { parent: true },
    });

    // Creamos una referencia rápida por ID
    const categoryMap = new Map<string, Category & { subCategories: Category[] }>();

    // Inicializamos el mapa con subcategorías vacías
    for (const cat of allCategories) {
      categoryMap.set(cat.id, { ...cat, subCategories: [] });
    }

    const tree: (Category & { subCategories: Category[] })[] = [];

    // Construimos el árbol
    for (const cat of allCategories) {
      const node = categoryMap.get(cat.id)!;
      if (cat.parentId) {
        const parentNode = categoryMap.get(cat.parentId);
        parentNode?.subCategories.push(node);
      } else {
        tree.push(node); // Raíz del árbol
      }
    }

    return response<Category[]>("ok", tree);
  } catch (error) {
    if (error instanceof Error) {
      return response<string>("error", error.message);
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

