'use client';

import { useState, useEffect, use } from "react";
import InvoiceModal from "../components/forms/InvoiceModal";
import deleteInvoice from "@/app/server/invoices/deleteInvoice";
import getInvoiceById from "@/app/server/invoices/getInvoiceById";
import StickyHeadTable from "../components/StickyTable";
import { Button, Menu, MenuItem } from '@mui/material';
import DropdownIcon from '@/public/icons/down.svg';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


export default function InvoiceCompoennt({ invoices, fetchInvoices, loading }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [searchType, setSearchType] = useState("vendor");
  const [searchText, setSearchText] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const openModal = (state) => {
    setModalOpen(true);
    state === "create" ? setEditInvoice({}) : null;
  };
  const closeModal = () => setModalOpen(false);

  const handleClick = (event) => {
    if (!selectedInvoice) {
      toast.warning("Please select an invoice");
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async () => {
    const response = await getInvoiceById({ id: selectedInvoice });
    if (response.status === 200) {
      setEditInvoice(response.body.invoice);
      openModal("edit");
    }
    handleClose();
  };

  const handleDelete = async () => {
    try {
      const toastStatus = toast.loading("Deleting invoice...");
      const response = await deleteInvoice({ id: selectedInvoice });
      if (response.status === 200) {
        toast.update(toastStatus, { render: response.body.message, type: "success", isLoading: false  ,autoClose: 2000});
        fetchInvoices();
      }
    } catch (error) {
      toast.update(toastStatus, { render: "Error deleting invoice", type: "error", isLoading: false, autoClose: 2000 });
      console.error("Error deleting invoice:", error);
    }
    handleClose();
  };


  useEffect(() => {
    const filtered = invoices.filter((invoice) => {
      if (searchType === "vendor") {
        return invoice.vendorName.toLowerCase().includes(searchText.toLowerCase());
      } else {
        return invoice.invoiceNumber.toLowerCase().includes(searchText.toLowerCase());
      }
    });
    setFilteredInvoices(filtered);
  }, [searchType, searchText, invoices]);

  return (
    <div className="mx-auto">
      <div className="w-full flex flex-col-reverse mb-4 justify-between gap-4 md:flex-row ">
        <div className="flex items-center">
          <select
            className="h-8 px-2 py-1.5 border border-gray-300 rounded-l-md"
            value={searchType}
            disabled={invoices.length === 0}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="vendor"> vendor</option>
            <option value="invoice"> invoice</option>
          </select>

          <input
            type="text"
            placeholder="search..."
            disabled={invoices.length === 0}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-8 px-2 py-1 border border-gray-300 rounded-r-md w-40"
          />
        </div>

        <div className="flex flex-col gap-4 justify-end items-end sm:flex-row">
          <div className="">
            <Button
              variant="contained"
              style={{ backgroundColor: "#164e63" }}
              onClick={handleClick}
              hidden={filteredInvoices.length === 0}
            >
              Actions <DropdownIcon className="w-4 h-4 ml-2" />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem
                onClick={handleDelete}
                style={{ backgroundColor: "#e3445c" }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
          <button
            className=" bg-cyan-900 px-3 py-1.5 rounded-sm text-white whitespace-nowrap"
            onClick={() => openModal("create")}
          >
            Create Invoice
          </button>
        </div>
      </div>
      {!loading ? (
        <div>
          {filteredInvoices.length === 0 ? (
            <p className="text-center">No invoices found</p>
          ) : (
            <StickyHeadTable
              rows={filteredInvoices}
              setSelectedInvoice={setSelectedInvoice}
            />
          )}
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      {modalOpen && (
        <InvoiceModal
          onClose={closeModal}
          invoice={editInvoice}
          refreshInvoices={fetchInvoices}
        />
      )}
    </div>
  );
}