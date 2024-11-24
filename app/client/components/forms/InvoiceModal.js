"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/input";
import Selector from "../inputs/selector";
import createInvoice from "@/app/server/invoices/createInvoice";
import updateInvoice from "@/app/server/invoices/updateInvoice";
import { toast } from "react-toastify";

export default function InvoiceModal({ onClose, invoice, refreshInvoices }) {
  const [formData, setFormData] = useState({
    id: "",
    vendorName: "",
    invoiceNumber: "",
    status: "Open",
    netAmount: 0,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date().toISOString().split("T")[0],
    department: "",
    costCenter: "",
    poNumber: "",
    ...invoice,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formData,
  });

  const statuses = [
    "Open",
    "Awaiting Approval",
    "Approved",
    "Processing",
    "Paid",
    "Rejected",
    "Vendor Not Found",
    "Duplicate",
    "Void",
  ];

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const statusToast = toast.loading("Saving Invoice...");
    try {
      let response = {};
      if (data.id) {
        response = await updateInvoice(data);
      } else {
        response = await createInvoice(data);
      }

      if (response.status === 201) {
        onClose();
        refreshInvoices();
        toast.update(statusToast, { render: response.body.message, type: "success",isLoading: false, autoClose: 2000});
      } else {
        toast.update(statusToast, { render: response.body.message, type: "error",isLoading: false, autoClose: 2000});
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.update(statusToast, {
        render: "Error saving invoice",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-md max-h-[90vh] overflow-y-auto mx-4 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {formData.id ? "Edit" : "Create"} Invoice
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Vendor Name */}
          <div>
            <Input
              label="Vendor Name"
              type="text"
              name="vendorName"
              register={register}
              value={formData?.vendorName}
              control={control}
              validation={{
                required: "required",
              }}
              onChange={(e) => handleChange("vendorName", e.target.value)}
              error={errors.vendorName}
            />
          </div>

          {/* Invoice Number */}
          <div>
            <Input
              label="Invoice Number"
              type="text"
              name="invoiceNumber"
              register={register}
              value={formData?.invoiceNumber}
              control={control}
              validation={{
                required: "required",
                pattern: {
                  value: /^INV[a-zA-Z0-9]*$/,
                  message: "Must start with 'INV'",
                },
              }}
              onChange={(e) => handleChange("invoiceNumber", e.target.value)}
              error={errors.invoiceNumber}
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <Selector
              label="Status"
              name="status"
              register={register}
              control={control}
              validation={{}}
              value={formData?.status}
              error={errors.status}
              options={statuses.map((status) => ({
                value: status,
                label: status,
              }))}
              defaultOption={{ value: "Open", label: "Open" }}
              onChange={(e) => handleChange("status", e.target.value)}
            />
          </div>

          {/* Net Amount */}
          <div>
            <Input
              label="Net Amount"
              type="number"
              name="netAmount"
              register={register}
              value={formData?.netAmount}
              control={control}
              validation={{
                required: "required",
              }}
              error={errors.netAmount}
              onChange={(e) => handleChange("netAmount", e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex-1">
              <Input
                label="Invoice Date"
                type="date"
                name="invoiceDate"
                register={register}
                value={formData?.invoiceDate}
                control={control}
                validation={{
                  required: "required",
                }}
                error={errors.invoiceDate}
                onChange={(e) => handleChange("invoiceDate", e.target.value)}
              />
            </div>

            {/* Due Date */}
            <div className="flex-1">
              <Input
                label="Due Date"
                type="date"
                name="dueDate"
                register={register}
                value={formData?.dueDate}
                control={control}
                validation={{
                  required: "required",
                }}
                error={errors.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex-1">
              <Input
                label="Department"
                type="text"
                name="department"
                register={register}
                value={formData?.department}
                control={control}
                validation={{
                  required: "required",
                }}
                error={errors.department}
                onChange={(e) => handleChange("department", e.target.value)}
              />
            </div>

            <div className="flex-1">
              <Input
                label="Cost Center"
                type="text"
                name="costCenter"
                register={register}
                value={formData?.costCenter}
                control={control}
                validation={{}}
                error={errors.costCenter}
                onChange={(e) => handleChange("costCenter", e.target.value)}
              />
            </div>
          </div>

          {/* PO Number */}
          <div>
            <Input
              label="PO Number"
              type="text"
              name="poNumber"
              register={register}
              value={formData?.poNumber}
              control={control}
              validation={{
                required: "required",
              }}
              error={errors.poNumber}
              onChange={(e) => handleChange("poNumber", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-cyan-800 text-white px-4 py-2 rounded-md hover:bg-cyan-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
