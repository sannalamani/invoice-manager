import UserIcon from "@/public/icons/user.svg";
import NotificationIcon from "@/public/icons/notification.svg"

export default function Header() {
    return (
      <div className="w-full p-4 text-black flex flex-col-reverse md:flex-row">
        <h1 className="text-2xl font-extrabold whitespace-nowrap ">Manage Invoices</h1>
        <div className="w-full flex items-center justify-end gap-4 divide-x-2 divide-gray-400">
          <NotificationIcon  className="w-10 h-10" /> 
          <div className="flex gap-2">
              <UserIcon className="w-12 h-12" /> 
              <div>   
                <p className="whitespace-nowrap">Manikanta Sannala</p>
                <p className="whitespace-nowrap">s.manik@outlook.fr</p>
              </div> 
          </div>
        </div>
      </div>
    );
  }
  