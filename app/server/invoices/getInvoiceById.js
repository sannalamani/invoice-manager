"use server";

import { PrismaClient } from "@prisma/client";
import z from "zod";

const schema = z.object({
    id: z.string().min(1, "Invoice ID is required"),
});

export default async function getInvoiceById(req) {
    const prisma = new PrismaClient();
    try {
        const validatedData = schema.safeParse(req);
        if (validatedData.success) {
            const invoice = await prisma.invoice.findUnique({
                where: {
                    id: validatedData.data.id,
                },
            });
            return {
                status: 200,
                body: { invoice },
            };
        }
    } catch (error) {
        console.error("Error getting invoice:", error);
        return {
            status: 500,
            body: { message: "Internal Server Error", error: error.message },
        };
    }
}