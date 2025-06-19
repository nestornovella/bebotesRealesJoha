import { prismaClient } from "@/app/api/helpers/prismaClient";
import { NextRequest } from "next/server";
import { response } from "@/app/api/helpers/helpers";
import { Order } from "@/app/interfaces/modelsInterfaces";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

   

    const { status }: { status: Order["status"] } = await request.json();

    if (!status) throw new Error("Falta el nuevo estado");

    const updatedOrder = await prismaClient.order.update({
      where: { id },
      data: { status },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    return response("ok", updatedOrder);
  } catch (error) {
    if (error instanceof Error) return response("error", error.message);
    return response("error", "Error de servidor desconocido");
  }
}
