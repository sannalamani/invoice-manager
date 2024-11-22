'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import  SettingsIcon from "@/public/icons/settings.svg"
import  VendorIcon from "@/public/icons/vendor.svg"
import DashboardIcon from "@/public/icons/dashboard.svg"
import InvoiceIcon from "@/public/icons/invoice.svg"

export default function Sidebar() {
    const pathname = usePathname();
    return (
      <div className="w-44 bg-blue-50 text-black flex flex-col ">
        <div className="p-8 text-xl font-bold">Finifi</div>
        <div className="flex flex-col ml-4 mt-6">
          <Link
            href="/client/dashboard"
            className={`link ${
              pathname === "/client/dashboard" ? "bg-cyan-900 rounded-l-full text-white": ""
            } py-2 px-4  flex flex-row`}
          >
          <DashboardIcon  className="mr-1 w-5 h-5"/>  Dashboard
          </Link>
          <Link
            href="/client/invoices"
            className={`link ${
              pathname === "/client/invoices" ? "bg-cyan-900 rounded-l-full text-white" : " "
            } py-2 px-4  flex flex-row`}
          >
           <InvoiceIcon  className="mr-1 w-5 h-5"/> Invoices
          </Link>
          <Link
            href="/client/vendors"
            className={`link ${
              pathname === "/client/vendors" ? "bg-cyan-900 rounded-l-full text-white" : " "
            } py-2 px-4  flex flex-row  items-center`}
          >
           <VendorIcon  className="mr-1 w-5 h-5"/> Vendors
          </Link>
          <Link
            href="/client/settings"
            className={`link ${
              pathname === "/client/settings" ? "bg-cyan-900 rounded-l-full text-white" : " "
            } py-2 px-4 flex flex-row items-center`}
          >
            <SettingsIcon  className="mr-1 w-5 h-5"/> Settings
          </Link>
        </div>
      </div>
    );
  }
  