import React, { useContext, useState } from "react";
import SignUpCredentials from "../Credentials/SignUpCredentials";
import PersonalData from "./components/PersonalData/PersonalData";
import StepWrapper from "./components/StepWrapper/StepWrapper";
import { WizardContext } from "./context/WizardContext";
import "./styles/multiStepForm.scss";

const Controls = () => {
  const { currentPage, setCurrentPage, numbersOfPages } = useContext(
    WizardContext
  );
  return (
    <>
      <div className="register-buttons">
        <div className="register-pagination">
          <button
            className="button button-form"
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Poprzednia
          </button>
          <button
            className="button button-form"
            type="button"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              return false;
            }}
            disabled={currentPage === numbersOfPages}
          >
            Następna
          </button>
        </div>
        <div className="register-submit">
          {currentPage === numbersOfPages && (
            <button className="button button-form" type="submit">
              Zarestruj się
            </button>
          )}
        </div>
      </div>
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
