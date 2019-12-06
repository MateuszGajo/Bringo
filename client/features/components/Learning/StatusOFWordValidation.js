import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import REMOVE_SESSION from "../../mutations/documentMutation";

const StatusOfWordValidation = ({
  setStatusOfChecking,
  isCorrectWord,
  wordValidation,
  userId,
  isSessionCompleted
}) => {
  const [removeSession, { isDeleted }] = useMutation(REMOVE_SESSION);

  useEffect(() => {
    if (isSessionCompleted) removeSession({ variables: { userId } });
  }, []);

  return (
    <div>
      <h2
        className="subtitle is-2 words"
        style={{ color: isCorrectWord ? "green" : "red" }}
      >
        {isCorrectWord ? "Prawidłowa odpowiedź" : "Błędna odpowiedź"}
      </h2>
      <h4 className="subtitle is-4 center-text small-line-height">
        <b>{wordValidation.en}</b>
      </h4>
      <h5 className="subtitle is-5 center-text small-line-height">
        {wordValidation.pl}
      </h5>
      {isSessionCompleted ? (
        <a className="button check" href="/resume">
          Dalej
        </a>
      ) : (
        <button
          className="button check"
          onClick={() => {
            setStatusOfChecking(false);
          }}
        >
          Dalej
        </button>
      )}
    </div>
  );
};

export default StatusOfWordValidation;
