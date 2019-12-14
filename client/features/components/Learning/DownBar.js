import React from "react";
import "./styles/downBar.scss";

const DownBar = ({ difficulty, procentCorrectness, score }) => {
  return (
    <>
      <nav className="navbar-menu downbar">
        <div className="navbar-start">
          <h4 className="subtitle is-4">{`Poziom: ${difficulty}`}</h4>
        </div>
        <div className="nabar-center">
          <h4 className="subtitle is-4">{`Poprawność sesji: ${procentCorrectness}%`}</h4>
        </div>
        <div className="navbar-end">
          <h4 className="subtitle is-4">{`Punkty: ${score}`}</h4>
        </div>
      </nav>
      <nav className="downbar nav-mobile-downbar is-hidden-desktop">
        <div className="navbar-start">
          <h4 className="subtitle is-4">{`Punkty: ${score}`}</h4>
        </div>
        <div className="navbar-end">
          <h4 className="subtitle is-4">{`Poprawność sesji: ${procentCorrectness}%`}</h4>
        </div>
      </nav>
    </>
  );
};

export default DownBar;
