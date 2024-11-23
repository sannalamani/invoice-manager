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
  const [editInvoice, setEditInvoice ] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState();

  const openModal = (state) => {setModalOpen(true); state === "create" ? setEditInvoice({}) : null;};
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


  const handleEdit = async() => {
    const response = await getInvoiceById({ id : selectedInvoice });
    if (response.status === 200) {
      setEditInvoice(response.body.invoice);
      openModal("edit");
    }
    handleClose(); 
  };


  const handleDelete = async() => {
    try {
      const response = await deleteInvoice({ id : selectedInvoice });
      if (response.status === 200) {
        toast.success(response.body?.message);
      }
    } catch (error) {
      toast.error("Error deleting invoice");
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
    getAllInvoices();
  }, [modalOpen]);

  return (
    <div>
      <div className="w-full flex mb-4 justify-end gap-4 ">
        <Button
          variant="contained"
          className="bg-cyan-900"
          onClick={handleClick}
        >
          Actions <DropdownIcon className="w-4 h-4 ml-2" />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit} className="hover:bg-blue-400">
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} className="hover:bg-rose-600">
            Delete
          </MenuItem>
        </Menu>
        <button
          className=" bg-cyan-900 px-3 py-1 text-white"
          onClick={() => openModal("create")}
        >
          Create Invoice
        </button>
      </div>
      {!loading ? (
        <div>
          {invoices.length === 0 ? (
            <p className="text-center">No invoices found</p>
          ) : (
            <StickyHeadTable
              rows={invoices}
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
