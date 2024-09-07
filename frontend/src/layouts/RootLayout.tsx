import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen h-full w-full bg-black text-gray-300">
      <Header />
      <main className="px-24 lg:px-16 md:px-10 sm:px-6 xs:px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
