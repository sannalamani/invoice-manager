'use client';

import { useState, useEffect } from "react";
import InvoiceModal from "../components/forms/InvoiceModal";
import getInvoices from "@/app/server/invoices/getInvoices";
import deleteInvoice from "@/app/server/invoices/deleteInvoice";
import getInvoiceById from "@/app/server/invoices/getInvoiceById";
import StickyHeadTable from "../components/StickyTable";
import { Button, Menu, MenuItem } from '@mui/material';
import DropdownIcon from '@/public/icons/down.svg';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


export default function InvoicePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editInvoice, setEditInvoice] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [searchType, setSearchType] = useState("vendor");
  const [searchText, setSearchText] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

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
      }
    } catch (error) {
      toast.update(toastStatus, { render: "Error deleting invoice", type: "error", isLoading: false, autoClose: 2000 });
      console.error("Error deleting invoice:", error);
    }
    getAllInvoices();
    handleClose();
  };

  const getAllInvoices = async () => {
    try {
      const response = await getInvoices();
      if (response.status === 200) {
        setInvoices(response.body.invoices);
      }
    } catch (error) {
      toast.error("Error fetching invoices");
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    getAllInvoices();
  }, [modalOpen]);

  return (
    <div className="min-w-[400px]">
      <div className="w-full flex mb-4 justify-between gap-4 ">
        <div className="flex items-center">
          <select
            className="px-2 py-1.5 border border-gray-300 rounded-l-md"
            aria-label="Select search type"
            value={searchType}
            disabled={invoices.length === 0}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="vendor">by vendor</option>
            <option value="invoice">by invoice</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            disabled={invoices.length === 0}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-r-md w-full"
          />
        </div>

        <div className="flex gap-4">
          <div>
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
            className=" bg-cyan-900 px-3 py-1 text-white"
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

      {modalOpen && <InvoiceModal onClose={closeModal} invoice={editInvoice} />}
    </div>
  );
}