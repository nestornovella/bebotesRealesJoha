import { NextRequest } from "next/server";
import { response } from "../../helpers/helpers";
import { prismaClient } from "../../helpers/prismaClient";

export async function DELETE(
    request: NextRequest,
    { params } 
) {
    try {
        console.log(request)
        const { id } = params; 

        if (!id) throw new Error("Se requiere un ID para eliminar el producto");

        await prismaClient.product.delete({
            where: { id },
        });

        return response<string>(
            "ok",
            `Producto con id ${id} eliminado con éxito`
        );
    } catch (error) {
        if (error instanceof Error) {
            return response<string>("error", error.message);
        }
    }
}
