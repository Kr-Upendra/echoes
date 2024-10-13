import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import NavItem from "../common/NavItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { clearUserData, removeTokens, successAlert } from "../../utils";
import { clearCurrentUser } from "../../state";
import default_user from "../../assets/icons/default_user.png";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  function handleClick() {
    successAlert("You are successfully logged out.");
    setTimeout(() => {
      clearUserData();
      dispatch(clearCurrentUser());
      removeTokens();
      navigate("/login");
    }, 1000);
  }

  return (
    <header className="flex items-center base-paddings pt-3 pb-6 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-green-500/20 to-[#0000000c]">
      <h1 className="text-xl mr-auto tracking-wide font-display text-white">
        <Link to="/">Memories</Link>
      </h1>
      <nav
        className={`flex items-center sm:absolute sm:top-0 sm:rounded-tr-md sm:rounded-br-md sm:w-[75%] sm:h-screen sm:bg-[#00000069] sm:backdrop-blur-md sm:flex sm:justify-center sm:items-center sm:flex-col sm:gap-y-3 transition-all duration-500 ${
          showNavbar ? "sm:-left-full" : "sm:left-0"
        }`}
      >
        {currentUser ? (
          <>
            <NavItem title="Dashboard" hrefValue="/dashboard" />
            <NavItem title="My Notes" hrefValue="/notes" />
            <NavItem title="Reminders" hrefValue="/notes" />

            <button
              onClick={handleClick}
              className="ml-6 sm:ml-0 font-display hover:text-green-500 transition-color text-base"
            >
              <img
                className="w-8 h-8 border-2 border-green-500 p-1 rounded-full"
                src={currentUser?.profilePicture || default_user}
                alt={currentUser?.firstName || "Default User"}
              />
            </button>
          </>
        ) : (
          <>
            <NavItem title="Home" hrefValue="/" />
            <NavItem title="Login" hrefValue="/login" />
            <NavItem title="Register" hrefValue="/register" />
          </>
        )}
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
