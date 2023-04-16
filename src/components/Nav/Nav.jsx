import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/">People</NavLink>
      <NavLink to="/add">Person</NavLink>
      <NavLink to="/gifts">Gifts</NavLink>
      <NavLink to="/gift">Gift</NavLink>
    </nav>
  )
}

export default Nav