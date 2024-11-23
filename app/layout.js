
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Invifi",
  description: "Manage your invoices with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-white`}
      >
        {children}
        <ToastContainer theme="light" position="bottom-right" autoClose={2000} />
      </body>
    </html>
  );
}
