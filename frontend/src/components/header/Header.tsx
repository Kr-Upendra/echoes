import { NavLink, useNavigate } from "react-router-dom";
import { IoBookOutline, IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "../common/NavItem";
import { RootState } from "../../state";
import { clearUserData, removeTokens, successAlert } from "../../utils";
import { clearCurrentUser } from "../../state";
import HeaderLogo from "./HeaderLogo";
import Button from "../buttons/Button";
import { AiOutlineUser } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import { IconType } from "react-icons";
import { BiGridAlt } from "react-icons/bi";
import useScreenWidth from "../../hooks/useScreenWidth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const width = useScreenWidth();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
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
  }

  return (
    <>
      <header className="flex items-center base-paddings backdrop-blur-[2px] pt-3 pb-6 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-green-500/20 to-[#0000000c]">
        <HeaderLogo />
        {!currentUser ? (
          <Button title="Get Started" onclick={() => navigate("/login")} />
        ) : (
          <>
            <div className="md:hidden">
              <NavItem
                title="Dashboard"
                hrefValue="/dashboard"
                handleClick={closeUserMenu}
              />
              <NavItem
                title="Memories"
                hrefValue="/memories"
                handleClick={closeUserMenu}
              />
              <NavItem
                title="Journals"
                hrefValue="/journals"
                handleClick={closeUserMenu}
              />
              <NavItem
                title="Profile"
                hrefValue="/profile"
                handleClick={closeUserMenu}
              />
              <Button
                title="LOGOUT"
                onclick={currentUser && handleClick}
                extraStyle="border-red-700 ml-2 text-white bg-red-700 hover:bg-red-800"
              />
            </div>
            <button
              type="button"
              className="hidden md:block cursor-pointer z-50"
              onClick={() => setShowNavbar((prev) => !prev)}
            >
              {showNavbar ? (
                <IoMenu className="text-2xl text-white" />
              ) : (
                <FaXmark className="text-2xl text-white" />
              )}
            </button>
          </>
        )}

        {currentUser && !showNavbar && (
          <div className="hidden md:block md:absolute md:z-30 md:top-0 md:left-0 md:w-full md:p-4 md:bg-black/95 md:backdrop-blur-sm md:rounded-md md:shadow-lg md:shadow-green-500/10 md:h-screen subsm:h-[40vh]">
            <HeaderLogo />
            <div className="md:flex md:flex-col md:justify-center md:items-center md:gap-y-3.5 h-[80%] mt-8 subsm:mt-0">
              {width <= 520 ? (
                <div className="subsm:hidden">
                  <NavItem
                    title="Dashboard"
                    hrefValue="/dashboard"
                    handleClick={closeUserMenu}
                  />
                  <NavItem
                    title="Journals"
                    hrefValue="/journals"
                    handleClick={closeUserMenu}
                  />
                  <NavItem
                    title="Memories"
                    hrefValue="/memories"
                    handleClick={closeUserMenu}
                  />
                  <NavItem
                    title="Profile"
                    hrefValue="/profile"
                    handleClick={closeUserMenu}
                  />
                </div>
              ) : (
                <>
                  <NavItem
                    title="Dashboard"
                    hrefValue="/dashboard"
                    handleClick={closeUserMenu}
                  />
                  <NavItem
                    title="Journals"
                    hrefValue="/journals"
                    handleClick={closeUserMenu}
                  />
                  <NavItem
                    title="Memories"
                    hrefValue="/memories"
                    handleClick={closeUserMenu}
                  />
                  <NavItem
                    title="Profile"
                    hrefValue="/profile"
                    handleClick={closeUserMenu}
                  />
                </>
              )}

              <Button
                title="LOGOUT"
                onclick={currentUser && handleClick}
                extraStyle="border-red-700 ml-2 text-white bg-red-700 hover:bg-red-800"
              />
            </div>
          </div>
        )}
      </header>
      {currentUser && (
        <div className="hidden subsm:block subsm:fixed subsm:z-30 subsm:bottom-0 subsm:left-0 subsm:w-full subsm:bg-black/95 subsm:backdrop-blur-sm subsm:shadow-lg subsm:shadow-green-500/10">
          <div className="flex items-center justify-center">
            <IconLink icon={BiGridAlt} href="/dashboard" />
            <IconLink icon={FiEdit} href="/memories" />
            <IconLink icon={IoBookOutline} href="/journals" />
            <IconLink icon={AiOutlineUser} href="/profile" />
          </div>
        </div>
      )}
    </>
  );
}

type Props = {
  icon: IconType;
  href: string;
};

export function IconLink({ icon: Icon, href }: Props) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `w-full py-3 flex justify-center font-bold items-start bg-green-200/5 border-x border-green-200/5 ${
          isActive ? "text-green-500 font-display" : "text-white"
        }`
      }
    >
      <Icon className="text-2xl" />
    </NavLink>
  );
}
