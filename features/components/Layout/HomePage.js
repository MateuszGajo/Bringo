import React, { useContext, useState } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import authContext from "../../context/authContext";
import "./styles/homePage.scss";

const HomePage = ({ children }) => {
  const {
    deleteCookie,
    userInfo: { firstName, lastName }
  } = useContext(authContext);

  const [isOpenHamurger, setOpenHamurger] = useState(false);
  return (
    <div className="wrapper">
      <nav className="main-navbar navbar-menu">
        <div className="navbar-start">
          <div className="navbar-brand">
            <a className="item-navbar is-size-3 title-color" href="/">
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
      </nav>
      <nav className="main-navbar navbar-mobile-menu is-hidden-desktop">
        <div className="navbar-start">
          <div className="navbar-brand">
            <a
              className="item-navbar is-size-3 title-color title-margin is-size-1"
              href="/"
            >
              Bringo
            </a>
          </div>
        </div>

        <div className="navbar-end">
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            onClick={() => setOpenHamurger(true)}
          />
          <div
            className={cx("hamburger-menu", {
              "is-active": isOpenHamurger
            })}
          >
            <div className="logo">
            <div className="close-nav">
              <FontAwesomeIcon
                icon={faAngleRight}
                size="2x"
                onClick={() => setOpenHamurger(false)}
              />
            </div>
              <a className="is-size-1 title-color " href="/">
                Bringo
              </a>
            </div>
            <div className="hamburger-menu-items">
              <div className="hamburger-menu-item">
                <FontAwesomeIcon icon={faUser} size="lg" color="#11999e" />
                <a className="user-name">
                  {firstName} {lastName}
                </a>
              </div>
              <div className="hamburger-menu-item">
              <a href="/">
                Strona Główna
                </a>
              </div>
              <div className="hamburger-menu-item">
                <a href="/ranking">
                Ranking
                </a>
              </div>
              <div className="hamburger-menu-item">
              <a className="logout" onClick={() => deleteCookie("token")}>
                Wyloguj się
              </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="box-content">{children}</div>
    </div>
  );
};

export default HomePage;
