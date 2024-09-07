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
          `ml-5 font-medium hover:text-primary-light transition-color ${
            isActive && "text-primary-real"
          }`
        }
        to={hrefValue}
      >
        {title}
      </NavLink>
    </>
  );
}
