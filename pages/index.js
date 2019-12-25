import React from "react";
import HomePage from "../features/components/Layout/HomePage";
import { isLogged, getSession } from "../helper";
import "bulma";
import "./styles/index.scss";
import "./styles/reset.scss";
import "./styles/customize.scss";

const Home = ({ isSession }) => {
  return (
    <HomePage>
      <div className="menu">
        <a className="button is-fullwidth" href="/learning">
          {isSession ? "Kontynuuj naukę" : "Zacznij nową sesje"}
        </a>
        <a className="button is-fullwidth" href="/ranking">
          Ranking
        </a>
      </div>
    </HomePage>
  );
};

Home.getInitialProps = async ctx => {
  await isLogged(ctx, "/signin");
  const { isSession } = await getSession(ctx);
  return {
    isSession
  };
};

export default Home;
