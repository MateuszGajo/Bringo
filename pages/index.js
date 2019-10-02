import React, { useContext } from "react";
import HomePage from "../components/Layout/HomePage";
import Router from "next/router";
import "bulma";
import "./index.module.scss";
import './reset.scss'

const Home = () => <HomePage />;

Home.getInitialProps = async function({ res }) {
  {
    // if (res) {
    //   res.writeHead(302, {
    //     Location: "/signup"
    //   });
    //   res.end();
    // } else {
    //   Router.push("/signup");
    // }
    return {};
  }
};

export default Home;
