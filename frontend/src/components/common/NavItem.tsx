import { NavLink } from "react-router-dom";

interface INavItem {
  title: string;
  hrefValue: string;
  handleClick?: any;
}

export default function NavItem({ title, hrefValue, handleClick }: INavItem) {
  return (
    <>
      <NavLink
        onClick={handleClick}
        className={({ isActive }) =>
          `mx-2 font-display hover:text-green-500 transition-color text-base ${
            isActive && "text-green-500 font-display"
          }`
        }
        to={hrefValue}
      >
        {title}
      </NavLink>
    </>
  );
}
