import React, { useContext, useState } from "react";
import SignUpCredentials from "../Credentials/SignUpCredentials";
import PersonalData from "./components/PersonalData/PersonalData";
import StepWrapper from "./components/StepWrapper/StepWrapper";
import { WizardContext } from "./context/WizardContext";
import "./multiStepForm.scss";

const Controls = () => {
  const { currentPage, setCurrentPage, numbersOfPages } = useContext(
    WizardContext
  );
  return (
    <>
      <button
        className="button button-form"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Poprzednia
      </button>
      <button
        className="button button-form"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === numbersOfPages}
      >
        Następna
      </button>
      {currentPage === numbersOfPages && (
        <button className="button button-form">Zarestruj się</button>
      )}
    </>
  );
};

const Step = ({ children, pageIndex }) => {
  const { currentPage } = useContext(WizardContext);
  return currentPage == pageIndex ? children : null;
};

const Wizard = props => {
  const { children } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [numbersOfPages, setNumbersOfPages] = useState(1);

  return (
    <WizardContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        numbersOfPages,
        setNumbersOfPages
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { Wizard, Controls, SignUpCredentials, PersonalData, StepWrapper, Step };
