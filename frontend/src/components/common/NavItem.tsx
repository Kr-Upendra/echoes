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
          `ml-6 font-medium hover:text-green-500 transition-color text-base ${
            isActive && "text-green-500 font-semibold"
          }`
        }
        to={hrefValue}
      >
        {title}
      </NavLink>
    </>
  );
}
