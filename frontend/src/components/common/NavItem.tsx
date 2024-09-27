import { NavLink } from "react-router-dom";

interface INavItem {
  title: string;
  hrefValue: string;
}

export default function NavItem({ title, hrefValue }: INavItem) {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          `ml-6 sm:ml-0 font-display hover:text-green-500 transition-color text-base ${
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
