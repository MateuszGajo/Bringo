import React from "react";

const HomePage = ({ children }) => {
  return (
    <div className="wrapper columns is-gapless">
      <div className="column">
        <div className="wrapper box">
          <h1 className="title is-1 title-color">Bringo</h1>
          <h3 className="title is-3">Twój internetowy nauczyciel</h3>
          <h4 className="subtitle is-3">
            Ucz się codziennie słówek z <b className="title-color">Bringo</b>
          </h4>
        </div>
      </div>
      <div className="column">
        <div className="wrapper box">{children}</div>
      </div>
    </div>
  );
};

export default HomePage;
