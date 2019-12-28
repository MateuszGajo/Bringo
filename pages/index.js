import React from "react";
import Head from 'next/head';
import HomePage from "../features/components/Layout/HomePage";
import { isLogged, getSession } from "../helper";
import "bulma";
import "./styles/index.scss";
import "./styles/reset.scss";
import "./styles/customize.scss";

const Home = ({ isSession }) => {
  return (
    <>
    <Head>
    <meta
      name="description"
      content="Bringo, strona do nauki słówek. Ucz się codziennie angielskich słówek."
    />
    <meta name="author" content="Mateusz Gajo" />
    <meta
      name="keywords"
      content="Bringo, nauka słówek, angielskie słówka, strona do nauki"
    />
    <meta name="url" content="https://bringo-app.herokuapp.com/" />
    <meta property="og:title" content="Bringo" />
    <meta
      property="og:image"
      content="https://raw.githubusercontent.com/MateuszGajo/Portfolio/master/assets/bringo.jpg"
    />
    <meta
      property="og:description"
      content="Strona do nauki słówek"
    />
    </Head>
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
    </>
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
