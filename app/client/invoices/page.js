'use client';

import { useState, useEffect, useCallback } from "react";
import getInvoices from "@/app/server/invoices/getInvoices";
import { toast } from "react-toastify";
import InvoiceCompoennt from "./InvoiceComponent";

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

export default function Page(){

    const [ selectedStatus, setSelectedStatus ] = useState("All");
    const [ invoices, setInvoices ] = useState([]);
    const [ loading, setLoading ] = useState(true);

 
    const fetchInvoices = useCallback(async () => {
      try {
        const response = await getInvoices({ selectedStatus });
        if (response.status === 200) {
          setInvoices(response.body.invoices);
        }
      } catch (error) {
        toast.error("Error fetching invoices");
        console.error("Error getting invoices:", error);
      }finally{
        setLoading(false);
      }
    }, [selectedStatus]);

    useEffect(() => {
      fetchInvoices(selectedStatus);
    }, [selectedStatus, fetchInvoices]);

    return (
      <div>
        <div className="flex justify-between border-y-2 mb-8 overflow-x-auto scrollbar-hide  mx-auto">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 ${
                selectedStatus === status ? "border-b-4 border-cyan-900" : ""
              }`}
            >
              <p className="whitespace-nowrap">{status}</p>
            </button>
          ))}
        </div>
          <InvoiceCompoennt invoices={invoices} fetchInvoices={fetchInvoices} loading={loading} />
      </div>
    );
}