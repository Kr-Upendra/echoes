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
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  function handleClick() {
    successAlert("You logged out successfully.");
    setTimeout(() => {
      clearUserData();
      dispatch(clearCurrentUser());
      removeTokens();
      navigate("/login");
    }, 1000);
  }

  function closeUserMenu() {
    setShowNavbar(true);
    setUserMenu(false);
  }

  return (
    <header className="flex items-center base-paddings pt-3 pb-6 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-green-500/20 to-[#0000000c]">
      <h1 className="text-xl mr-auto tracking-wide font-display text-white">
        <Link to="/">Memories</Link>
      </h1>
      <nav
        className={`sm:flex sm:items-center sm:justify-center sm:absolute sm:top-0 sm:rounded-tr-md sm:rounded-br-md sm:w-[75%] sm:h-screen sm:bg-[#00000069] sm:backdrop-blur-md transition-all duration-500 ${
          showNavbar ? "sm:-left-full" : "sm:left-0"
        }`}
      >
        {currentUser ? (
          <div className="flex items-center sm:flex-col relative gap-3 sm:gap-y-5">
            <NavItem
              title="Dashboard"
              hrefValue="/dashboard"
              handleClick={closeUserMenu}
            />
            <NavItem
              title="My Notes"
              hrefValue="/notes"
              handleClick={closeUserMenu}
            />
            <NavItem
              title="Reminders"
              hrefValue="/reminders"
              handleClick={closeUserMenu}
            />

            <button
              onClick={() => setUserMenu(true)}
              className="ml-2 font-display hover:text-green-500 transition-color text-base"
            >
              <img
                className={`w-8 h-8 border-2 border-green-500 rounded-full ${
                  currentUser?.profilePicture ? "p-0" : "p-1"
                }`}
                src={currentUser?.profilePicture || default_user}
                alt={currentUser?.firstName || "Default User"}
              />
            </button>

            <div
              className={`rounded-xl transition-all duration-500 py-4 absolute top-12 -right-16 sm:top-32 sm:left-24 flex-col justify-center items-center gap-y-3 w-40 shadow-2xl shadow-black/20 bg-green-900/80 ${
                userMenu ? "flex" : "hidden"
              }`}
            >
              <NavItem
                handleClick={closeUserMenu}
                title="Profile"
                hrefValue="/profile"
              />
              <NavItem
                handleClick={closeUserMenu}
                title="Settings"
                hrefValue="/settings"
              />
              <button
                onClick={currentUser && handleClick}
                className="ml-0 sm:ml-0 font-display hover:text-green-500 transition-color text-base"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center sm:flex-col gap-3 sm:gap-y-5">
            <NavItem title="Home" hrefValue="/" handleClick={closeUserMenu} />
            <NavItem
              title="About"
              hrefValue="/about"
              handleClick={closeUserMenu}
            />
            <NavItem
              title="Login"
              hrefValue="/login"
              handleClick={closeUserMenu}
            />
            <NavItem
              title="Register"
              hrefValue="/register"
              handleClick={closeUserMenu}
            />
          </div>
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
