import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import NavItem from "../common/NavItem";
import { useState } from "react";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  return (
    <header className="flex items-center base-paddings pt-3 pb-6 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-green-500/20 to-[#0000000c]">
      <h1 className="text-xl mr-auto tracking-wide font-display text-white">
        <Link to="/">Memories</Link>
      </h1>
      <nav
        className={`sm:absolute sm:top-0 sm:rounded-tr-md sm:rounded-br-md sm:w-[75%] sm:h-screen sm:bg-[#00000069] sm:backdrop-blur-md sm:flex sm:justify-center sm:items-center sm:flex-col sm:gap-y-3 transition-all duration-500 ${
          showNavbar ? "sm:-left-full" : "sm:left-0"
        }`}
      >
        <NavItem title="Home" hrefValue="/" />
        <NavItem title="Login" hrefValue="/login" />
        <NavItem title="Register" hrefValue="/register" />
      </nav>
      <button
        className="hidden sm:block cursor-pointer"
        onClick={() => setShowNavbar((prev) => !prev)}
      >
        {showNavbar ? (
          <IoMenu className="text-2xl text-white" />
        ) : (
          <FaXmark className="text-2xl text-white" />
        )}
      </button>
    </header>
  );
}
