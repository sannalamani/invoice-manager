import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 text-black" style={{ maxWidth: 'calc(100vw - 176px)' }}>{children}</main>
      </div>
    </div>
  );
}
