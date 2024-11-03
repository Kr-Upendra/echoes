import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import NavItem from "../common/NavItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { clearUserData, removeTokens, successAlert } from "../../utils";
import { clearCurrentUser } from "../../state";
import default_user from "../../assets/icons/default_user.png";
import { IoIosLogOut } from "react-icons/io";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  const userProfile = useSelector(
    (state: RootState) => state.userProfile.userProfile
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
  }

  return (
    <header className="flex items-center base-paddings backdrop-blur-[2px] pt-3 pb-6 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-green-500/20 to-[#0000000c]">
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
            {/* <NavItem
              title="Voice"
              hrefValue="/voice-notes"
              handleClick={closeUserMenu}
            /> */}
            <NavLink to="/profile" className="mx-2">
              <img
                className={`w-8 h-8 border-2 border-green-500 rounded-full ${
                  currentUser?.profilePicture || userProfile?.profilePicture
                    ? "p-0"
                    : "p-1"
                }`}
                src={
                  currentUser?.profilePicture ||
                  userProfile?.profilePicture ||
                  default_user
                }
                alt={currentUser?.firstName || "Default User"}
              />
            </NavLink>
            <button
              onClick={currentUser && handleClick}
              className="ml-2 sm:ml-0 border-2 border-red-500 w-8 h-8 rounded-md flex justify-center items-center"
            >
              <IoIosLogOut className="text-2xl font-extrabold text-red-500 " />
            </button>
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
              title="Get Started"
              hrefValue="/login"
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
