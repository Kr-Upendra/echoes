import { NavLink, useNavigate } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
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
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      successAlert("You logged out successfully.");
      setTimeout(() => {
        // Clear user data and tokens, reset state
        clearUserData();
        dispatch(clearCurrentUser());
        removeTokens();
        navigate("/login");
      }, 1000);
    },
    onError: (error) => {
      // Handle error state, for example by showing an error alert
      console.error("Logout failed:", error.message);
    },
  });

  function handleClick() {
    mutation.mutate();
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
              <NavItem title="Dashboard" hrefValue="/dashboard" />
              <NavItem title="Memories" hrefValue="/memories" />
              <NavItem title="Journals" hrefValue="/journals" />
              <NavItem title="Profile" hrefValue="/profile" />
              <NavItem title="Settings" hrefValue="/settings" />
            </div>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `hidden md:block ${
                  isActive
                    ? "text-green-500 font-display font-extrabold"
                    : "text-white font-display font-extrabold"
                }`
              }
            >
              <IoSettingsOutline className="w-6 h-6" />
            </NavLink>
          </>
        )}
      </header>
      {currentUser && (
        <div className="hidden md:block md:fixed md:z-30 md:bottom-10 md:left-0 md:w-full">
          <div className="border border-green-500/20 mx-auto rounded-full w-[80%] bg-black/95 backdrop-blur-sm shadow-lg shadow-green-500/10">
            <div className="flex items-center justify-center">
              <IconLink
                icon={BiGridAlt}
                href="/dashboard"
                extraStyle="rounded-l-full"
              />
              <IconLink icon={FiEdit} href="/memories" />
              <IconLink icon={IoBookOutline} href="/journals" />
              <IconLink
                icon={AiOutlineUser}
                href="/profile"
                extraStyle="rounded-r-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type Props = {
  icon: IconType;
  href: string;
  handleClick?: () => void;
  extraStyle?: string;
};

export function IconLink({ icon: Icon, href, handleClick, extraStyle }: Props) {
  return (
    <NavLink
      onClick={handleClick}
      to={href}
      className={({ isActive }) =>
        `w-full py-4 flex justify-center font-bold items-start bg-green-200/5 border-x border-green-200/5 ${extraStyle} ${
          isActive
            ? "text-green-500 font-display font-extrabold"
            : "text-white font-display font-extrabold"
        }`
      }
    >
      <Icon className="text-2xl" />
    </NavLink>
  );
}
