"use server";

import { PrismaClient } from "@prisma/client";
import z from "zod";

const schema = z.object({
    selectedStatus: z.enum([
        "All",
        "Open",
        "Awaiting Approval",
        "Approved",
        "Processing",
        "Paid",
        "Rejected",
        "Vendor Not Found",
        "Duplicate",
        "Void",
    ]),
});

export default async function getInvoices(req) {
    const prisma = new PrismaClient();
    const validatedData = schema.safeParse(req);
    try {
        const invoices = await prisma.invoice.findMany(
        validatedData.data?.selectedStatus === "All"
            ? {}
            : {
                where: {
                status: validatedData?.data?.selectedStatus,
                },
            }
        );
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
