import React, { useEffect } from "react";
import Router from "next/router";
import HomePage from "../features/components/Layout/HomePage";
import { useMutation } from "@apollo/react-hooks";
import REMOVE_SESSION from "../features/mutations/documentMutation";
import { UPDATE_USER } from "../features/mutations/userMutation";
import { isLogged, getSession } from "../helper";
import "bulma";
import "./styles/reset.scss";
import "./styles/customize.scss";

const Resume = ({ userId, sessionInfo }) => {
  const { procentCorrectness, score } = sessionInfo.amounts;
  const [removeSession, { isDeleted }] = useMutation(REMOVE_SESSION);
  const [updateUser, { isUpdatedUser }] = useMutation(UPDATE_USER);

  useEffect(() => {
    updateUser({ variables: { userId, score } });
    removeSession({ variables: { userId } });
  }, []);
  return (
    <HomePage>
      <div>
        <h2 className="subtitle is-1">Wykonałeś sesje</h2>
        <h2 className="subtitle is-2 has-text-centered">Statystyki</h2>
        <h6 className="subtitle is-5 has-text-centered">
          Uzyskana ilość pkt: {score}pkt
        </h6>
        <h6 className="subtitle is-5 has-text-centered">
          Poprawność sesji: {procentCorrectness}%
        </h6>
        <button
          className="button is-horizontal-center is-flex"
          onClick={() => Router.push("/")}
        >
          Powrót do strony głównej
        </button>
      </div>
    </HomePage>
  );
};

Resume.getInitialProps = async ctx => {
  const { res } = ctx;
  await isLogged(ctx, "/signin");

  const { isSession, sessionInfo, userId } = await getSession(ctx);

  if (isSession) {
    if (res) {
      res.writeHead(302, {
        Location: "/"
      });
      res.end();
    } else {
      Router.push("/");
    }
  }
  return {
    sessionInfo,
    userId
  };
};

export default Resume;