"use server"

import { PrismaClient } from "@prisma/client";
import z from "zod";

const schema = z.object({
    id: z.string().min(1, "Invoice ID is required"),
});

export default async function deleteInvoice(req) {
    const prisma = new PrismaClient();
    try {
        const validatedData = schema.safeParse(req);
        if (validatedData.success) {
            const invoice = await prisma.invoice.delete({
                where: {
                    id: validatedData.data.id,
                },
            });
            console.log("Invoice Deleted:", invoice);
            return {
                status: 200,
                body: { message: "Invoice deleted successfully" },
            };
        }
    } catch (error) {
        console.error("Error deleting invoice:", error);
        return {
            status: 500,
            body: { message: "Internal Server Error", error: error.message },
        };
    }
}

