import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import InstallPrompt from "../components/InstallPrompt";

export default function RootLayout() {
  return (
    <div className="min-h-screen relative h-full w-full bg-black text-gray-300">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
      <InstallPrompt />
    </div>
  );
}
