import React from "react";
import Login from "../Login/Login";
import "./Home.css";

const Home = () => {
  return (
    <section className="Home">
      <h2>Welcome to Giftr!</h2>
      <p>Login to start adding gifts.</p>
      <Login />
    </section>
  );
};

export default Home;
