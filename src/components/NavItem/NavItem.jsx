import { NavLink } from "react-router-dom";
import "./NavItem.css";

const NavItem = ({ children, to, exact }) => {
  return (
    <NavLink to={to} end={exact}>
      {children}
    </NavLink>
  );
};

export default NavItem;
