import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center py-2 px-24 lg:px-16 md:px-10 sm:px-6 xs:px-4">
      <h1 className="text-xl mr-auto font-bold text-white">
        <Link to="/">Memories</Link>
      </h1>
      <nav className="">
        <Link className="mx-2 text-white font-medium" to="/">
          Home
        </Link>
        <Link className="mx-2 text-white font-medium" to="/login">
          Login
        </Link>
        <Link className="mx-2 text-white font-medium" to="/register">
          Register
        </Link>
      </nav>
    </header>
  );
}
