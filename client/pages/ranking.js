import React, { useState, useEffect } from "react";
import cookies from "next-cookies";
import cx from "classnames";
import jwt_deocde from "jwt-decode";
import GET_RANKINGS from "../features/queries/getRankingQuery";
import HomePage from "../features/components/Layout/HomePage";
import Pagination from "../features/components/Pagination/Pagination";
import "bulma";
import "./styles/reset.scss";
import "./styles/customize.scss";

const Ranking = ({ rankings, userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(8);

  useEffect(() => {
    rankings.map((user, index) => {
      return userId === user.id
        ? setCurrentPage(Math.ceil((index + 1) / 10))
        : null;
    });
    setLastPage(Math.ceil(rankings.length / 10));
  }, [rankings]);

  return (
    <HomePage>
      <div className="container">
        <table className="table is-fullwidth ">
          <thead>
            <tr>
              <th>Miejsce</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Punkty</th>
            </tr>
          </thead>
          <tbody>
            {rankings
              .slice(currentPage * 10 - 10, currentPage * 10)
              .map((user, index) => (
                <tr
                  key={index}
                  className={cx({ "is-selected": user.id === userId })}
                >
                  <td>{currentPage * 10 - 10 + index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </HomePage>
  );
};

Ranking.getInitialProps = async ctx => {
  let users;
  const { token } = cookies(ctx);
  const userInfo = jwt_deocde(token);

  try {
    users = await ctx.apolloClient.query({
      query: GET_RANKINGS
    });
  } catch {
    throw new Error("can't get users");
  }

  return {
    rankings: users.data.getRankings,
    userId: userInfo.id
  };
};

export default Ranking;
