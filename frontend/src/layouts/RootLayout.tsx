import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen h-full w-full bg-background-real text-text-real">
      <Header />
      <main className="base-paddings">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
