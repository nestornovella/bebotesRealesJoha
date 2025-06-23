import { NextRequest } from "next/server";
import { prismaClient } from "../../helpers/prismaClient";
import { response } from "../../helpers/helpers";
import { Prisma } from "@/generated/prisma";


export async function DELETE(request: NextRequest, { params }) {

    try {
        const { id } = await params

        const deleted = await prismaClient.category.delete({
            where: {
                id
            }
        })

        return response('ok', 'se elimino la categoria ' + deleted.name)

    } catch (error) {

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            return response('error', 'la categoria no existe')
        }
        else if (error instanceof Error) {
            return response('error', error.message)
        }
        else {
            throw error; // re-lanzar si es otro error
        }
    }
}