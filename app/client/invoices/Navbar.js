"use client";

import { useState, useEffect } from "react";

export default function Navbar({ invoices, setInvoiceByStatus }) {
    const statuses = [
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
      ];

    const [ selectedStatus, setSelectedStatus ] = useState("All");

    const handleStatusClick = (status) => {
        setSelectedStatus(status);
        if (status) {
          const filtered = invoices.filter((invoice) => invoice.status === status);
          setInvoiceByStatus(filtered);
        }
        if (status === "All") {
          setInvoiceByStatus(invoices);
        }
      };

    useEffect(() => {
        setInvoiceByStatus(invoices);
        setSelectedStatus("All");
      }, [setInvoiceByStatus, invoices]);

    return (
      <div className="flex justify-between border-y-2 mb-8 overflow-x-auto scrollbar-hide  mx-auto">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusClick(status)}
            className={`px-4 py-2 ${
              selectedStatus === status ? "border-b-4 border-cyan-900" : ""
            }`}
          >
            <p className="whitespace-nowrap">{status}</p>
          </button>
        ))}
      </div>
    );
}