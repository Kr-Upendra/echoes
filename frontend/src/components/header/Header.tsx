import { Link } from "react-router-dom";
import NavItem from "../common/NavItem";

export default function Header() {
  return (
    <header className="flex items-center base-paddings pt-3 pb-6 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-green-500/20 to-[#0000000c]">
      <h1 className="text-xl mr-auto tracking-wide font-display text-white">
        <Link to="/">Memories</Link>
      </h1>
      <nav className="">
        <NavItem title="Home" hrefValue="/" />
        <NavItem title="Login" hrefValue="/login" />
        <NavItem title="Register" hrefValue="/register" />
      </nav>
    </header>
  );
}
