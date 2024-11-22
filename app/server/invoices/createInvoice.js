"use server";

import { PrismaClient, Prisma } from "@prisma/client";
import z from "zod";

// Zod schema for validation
const createInvoiceSchema = z.object({
  vendorName: z.string().min(1, "Vendor Name is required"),
  invoiceNumber: z.string().startsWith("INV", "Invoice Number must start with INV"),
  status: z.string().min(1, "Status is required"),
  netAmount: z.number().nonnegative("Net Amount must be a positive number"),
  invoiceDate: z.string().min(1, "Invoice Date is required"),
  dueDate: z.string().min(1, "Due Date is required"),
  department: z.string().min(1, "Department is required"),
  costCenter: z.string().nullable().optional(),
  poNumber: z.string().min(1, "PO Number is required"),
});

export default async function createInvoice(req) {
  const prisma = new PrismaClient();
  try {
    const validatedData = createInvoiceSchema.safeParse(req);

    if (validatedData.success) {
      const invoiceExists = await prisma.invoice.findFirst({
        where: {
          invoiceNumber: validatedData.data.invoiceNumber,
        },
      });
      if (invoiceExists) {
        return {
          status: 409,
          body: { message: "Invoice already exists" },
        };
      }
      const invoice = await prisma.invoice.create({
        data: {
          ...validatedData.data,
          createdDate: new Date().toISOString().split("T")[0],
          createdTime: new Date().toLocaleTimeString(),
        },
      });
      console.log("Invoice Created:", invoice);

      return {
        status: 201,
        body: { message: "Invoice created successfully", invoice },
      };
    }
  } catch (err) {
    console.error("Error creating invoice:", err);
    return {
      status: 500,
      body: { message: "Internal Server Error", error: err.message },
    };
  }
}
