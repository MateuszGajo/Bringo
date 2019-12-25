import React from "react";
export const WizardContext = React.createContext({
  currentPage: 1,
  setCurrentPage: () => {},
  numbersOfPages: null,
  setNumbersOfPages: () => {}
});
