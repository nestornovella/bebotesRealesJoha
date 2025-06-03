import { PrismaClient } from '@/generated/prisma'

// Declaramos un tipo para globalThis
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Usamos la instancia existente o creamos una nueva
export const prismaClient = globalForPrisma.prisma ?? new PrismaClient()

// En desarrollo, guardamos la instancia en globalThis
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaClient
}