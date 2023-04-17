import React from "react";
import CheckToken from "../../auth/CheckToken";
import Nav from "../Nav/Nav";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="skip-links">
        <a href="#menu">Skip to menu</a>
        <a href="#content">Skip to content</a>
      </div>
      <div className="main-nav">
        <div className="container-fluid">
          <div className="left-nav"></div>
          <h1 className="logo">
            <span className="sr-only">Giftr</span>
            <img src="/logo/logo-full.svg" alt="logo" />
          </h1>
          <div className="right-nav">
            <CheckToken />
            <Nav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
