import React, { useContext } from "react";
import authContext from "../../context/authContext";
import "./styles/homePage.scss";

const HomePage = ({ children }) => {
  const {
    deleteCookie,
    userInfo: { firstName, lastName }
  } = useContext(authContext);
  return (
    <div className="wrapper">
      <nav className="navbar main">
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-brand">
              <a className="item-navbar is-size-3" href="/">
                Bringo
              </a>
            </div>
          </div>
          <div>{`${firstName} ${lastName}`}</div>
          <div className="navbar-end">
            <a className="logout" onClick={() => deleteCookie("token")}>
              Wyloguj się
            </a>
          </div>
        </div>
      </nav>
      <div className="box-content">{children}</div>
    </div>
  );
};

export default HomePage;
