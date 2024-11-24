import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex w-full flex-col min-w-[calc(100vw-100px)] sm:min-w-[calc(100vw-200px)] ">
        <Header />
        <main className="px-6 text-black">{children}</main>
      </div>
    </div>
  );
}
