'use client';

import { useState } from "react";
import InvoiceModal from "../components/layouts/InvoiceModal";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        
        <div>
          <button className="bg-cyan-900 px-3 py-1 text-white" onClick={openModal}>
            Create Invoice
          </button>
        </div>
      </div>

      {modalOpen && <InvoiceModal onClose={closeModal}/>}
    </div>
  );
}
