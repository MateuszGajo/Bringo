import React from "react";
import "./styles/authPage.scss";

const AuthPage = ({ children }) => {
  return (
    <div className="is-fullheight columns is-gapless">
      <div className="column">
        <div className="is-fullheight box">
          <h1 className="title is-1 primary-color">Bringo</h1>
          <h3 className="title is-3">Twój internetowy nauczyciel</h3>
          <h4 className="subtitle is-3">
            Ucz się codziennie słówek z <b className="primary-color">Bringo</b>
          </h4>
        </div>
      </div>
      <div className="column">
        <div className="is-fullheight box">{children}</div>
      </div>
    </div>
  );
};

export default AuthPage;
