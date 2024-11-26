"use server";

import { PrismaClient } from "@prisma/client";
import z from "zod";

// Zod schema for validation
const updateInvoiceSchema = z.object({
  id: z.string().min(1, "Invoice ID is required"),
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

export default async function updateInvoice(req) {
  const prisma = new PrismaClient();
  try {
    const validatedData = updateInvoiceSchema.safeParse(req);
    console.log("validatedData", validatedData);
    if (validatedData.success) {

      const invoice = await prisma.invoice.update({
        where: {
          id: validatedData.data.id,
        },
        data: {
            vendorName: validatedData.data.vendorName,
            invoiceNumber: validatedData.data.invoiceNumber,
            status: validatedData.data.status,
            netAmount: validatedData.data.netAmount,
            invoiceDate: validatedData.data.invoiceDate,
            dueDate: validatedData.data.dueDate,
            department: validatedData.data.department,
            costCenter: validatedData.data.costCenter,
            poNumber: validatedData.data.poNumber,
            // createdDate: new Date().toISOString().split("T")[0],
            // createdTime: new Date().toLocaleTimeString(),
        },
      });
      console.log("Invoice Updated:", invoice);

      return {
        status: 201,
        body: { message: "Invoice updated successfully", invoice },
      };
    }
  } catch (err) {
    console.error("Error updating invoice:", err);
    return {
      status: 500,
      body: { message: "Internal Server Error", error: err.message },
    };
  }
}
