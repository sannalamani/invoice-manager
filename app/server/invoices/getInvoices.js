"use server";

import { PrismaClient } from "@prisma/client";

export default async function getInvoices() {
    const prisma = new PrismaClient();
    try {
        const invoices = await prisma.invoice.findMany();
        return {
        status: 200,
        body: { invoices },
        };
    } catch (error) {
        console.error("Error getting invoices:", error);
        return {
        status: 500,
        body: { message: "Internal Server Error" },
        };
    }
}
