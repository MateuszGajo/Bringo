import React from "react";

const DownBar = ({ difficulty, procentCorrectness, score }) => {
  return (
    <nav
      className="navbar downbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <h4 className="subtitle is-4">{`Poziom: ${difficulty}`}</h4>
        </div>
        <div className="nabar-center">
          <h4 className="subtitle is-4">{`Poprawność sesji: ${procentCorrectness}%`}</h4>
        </div>
        <div className="navbar-end">
          <h4 className="subtitle is-4">{`Punkty: ${score}`}</h4>
        </div>
      </div>
    </nav>
  );
};

export default DownBar;
