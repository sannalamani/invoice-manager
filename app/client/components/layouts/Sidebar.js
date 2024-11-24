"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SettingsIcon from "@/public/icons/settings.svg";
import VendorIcon from "@/public/icons/vendor.svg";
import DashboardIcon from "@/public/icons/dashboard.svg";
import InvoiceIcon from "@/public/icons/invoice.svg";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-12 sm:w-44 bg-blue-50 text-black flex flex-col">
      <div className="p-8 text-xl font-bold sm:block hidden">Invifi</div>
      <div className="flex flex-col mt-24 sm:mt-6 ml-4 space-y-4">
        <Link
          href="/client/dashboard"
          className={`py-2 px-4 flex flex-col items-center sm:flex-row sm:items-center ${
            pathname === "/client/dashboard"
              ? "bg-cyan-900 text-white rounded-l-full"
              : ""
          }`}
        >
          <DashboardIcon className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2" />
          <p className="hidden sm:block">Dashboard</p>
        </Link>

        <Link
          href="/client/invoices"
          className={`py-2 px-4 flex flex-col items-center sm:flex-row sm:items-center ${
            pathname === "/client/invoices"
              ? "bg-cyan-900 text-white rounded-l-full"
              : ""
          }`}
        >
          <InvoiceIcon className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2" />
          <p className="hidden sm:block">Invoices</p>
        </Link>

        <Link
          href="/client/vendors"
          className={`py-2 px-4 flex flex-col items-center sm:flex-row sm:items-center ${
            pathname === "/client/vendors"
              ? "bg-cyan-900 text-white rounded-l-full"
              : ""
          }`}
        >
          <VendorIcon className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2" />
          <p className="hidden sm:block">Vendors</p>
        </Link>

        <Link
          href="/client/settings"
          className={`py-2 px-4 flex flex-col items-center sm:flex-row sm:items-center ${
            pathname === "/client/settings"
              ? "bg-cyan-900 text-white rounded-l-full"
              : ""
          }`}
        >
          <SettingsIcon className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2" />
          <p className="hidden sm:block">Settings</p>
        </Link>
      </div>
    </div>
  );
}
