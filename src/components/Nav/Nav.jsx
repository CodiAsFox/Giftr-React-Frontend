import { NavLink } from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import IsLogged from "../../auth/IsLogged";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import "./Nav.css";

const Nav = () => {
  return IsLogged() ? (
    <nav className="main-menu">
      <NavItem className="btn" to="/users">
        <span className="material-symbols-rounded">group</span>
        <span className="menu-text">People</span>
      </NavItem>
      <Logout />

      {/* <NavLink to="/">People</NavLink>
      <NavLink to="/add">Person</NavLink>
      <NavLink to="/gifts">Gifts</NavLink>
      <NavLink to="/gift">Gift</NavLink> */}
    </nav>
  ) : (
    <nav className="main-menu">
      <ul className="menu">
        <li>
          <Login />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
