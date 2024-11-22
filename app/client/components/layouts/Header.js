import UserIcon from "@/public/icons/user.svg";
import NotificationIcon from "@/public/icons/notification.svg"

export default function Header() {
    return (
      <div className="w-full p-4 text-black flex">
        <h1 className="text-2xl font-extrabold whitespace-nowrap ">Manage Invoices</h1>
        <div className="w-full flex justify-end gap-4 divide-x-2 divide-gray-400">
          <NotificationIcon  className="w-8 h-8" /> 
          <UserIcon className="w-8 h-8" /> Manikanta Sannala
        </div>
      </div>
    );
  }
  