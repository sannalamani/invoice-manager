'use client';

import { useState } from "react";
import  createInvoice from "@/app/server/invoices/createInvoice";
import updateInvoice from "@/app/server/invoices/updateInvoice";
import { toast } from "react-toastify";

export default function InvoiceModal({ onClose, invoice, refreshInvoices }) {

  const [formData, setFormData] = useState({
    id: "",
    vendorName: "",
    invoiceNumber: "",
    status: "Open",
    netAmount: 0,
    invoiceDate:  new Date().toISOString().split("T")[0],
    dueDate:  new Date().toISOString().split("T")[0],
    department: "",
    costCenter: "",
    poNumber: "",
    ...invoice,
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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({ ...prevData,[name]: type === "number" ? parseInt(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusToast = toast.loading("Saving Invoice...");
    try {
      let response = {};
      if (formData.id) {
        response = await updateInvoice(formData);
      } else {
        response = await createInvoice(formData);
      }

      
      if (response.status === 201) {
        onClose();
        refreshInvoices();
        toast.update(statusToast, { render: "Invoice saved successfully", type: "success", isLoading: false, autoClose: 2000 });
      }
      else {
        toast.update(statusToast, { render: "Error saving invoice", type: "error",isLoading: false, autoClose: 2000});
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.update(statusToast, { render: "Error saving invoice", type: "error", isLoading: false, autoClose: 2000 });
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
          <h2 className="text-xl font-bold">{ formData.id ? "Edit":"Create" }  Invoice</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vendor Name */}
          <div>
            <label className="block text-sm font-medium">Vendor Name</label>
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Invoice Number */}
          <div>
            <label className="block text-sm font-medium">Invoice Number (starts with INV)</label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              placeholder="ex.INV0001"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Net Amount */}
          <div>
            <label className="block text-sm font-medium">Net Amount</label>
            <input
              type="number"
              name="netAmount"
              value={formData.netAmount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate} 
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Due Date */}
            <div className="flex-1">
              <label className="block text-sm font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate} 
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Cost Center (optional)</label>
              <input
                type="text"
                name="costCenter"
                value={formData.costCenter}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* PO Number */}
          <div>
            <label className="block text-sm font-medium">PO Number</label>
            <input
              type="text"
              name="poNumber"
              value={formData.poNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
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
