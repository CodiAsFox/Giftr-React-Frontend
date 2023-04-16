import React from "react";
import Logout from "../Logout/Logout";
import CheckToken from "../../auth/CheckToken";

const Header = () => {
  return (
    <header>
      Header
      <CheckToken />
      <Logout />
    </header>
  );
};

export default Header;
