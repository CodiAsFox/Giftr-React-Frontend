import { NavLink } from "react-router-dom";

const NavItem = ({ children, to, exact }) => {
  return (
    <NavLink to={to} end={exact}>
      {children}
    </NavLink>
  );
};

export default NavItem;
