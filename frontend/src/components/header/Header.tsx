import { Link } from "react-router-dom";
import NavItem from "../common/NavItem";

export default function Header() {
  return (
    <header className="flex items-center base-paddings">
      <h1 className="text-xl mr-auto font-bold text-primary-mid">
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
