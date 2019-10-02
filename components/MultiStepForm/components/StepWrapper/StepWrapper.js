import React, { useContext, useEffect } from "react";
import { WizardContext } from "../../context/WizardContext";

const PageWrapper = ({ children }) => {
  let pageIndex = 1;
  children = children.map(child => {
    return React.cloneElement(child, {
      pageIndex: pageIndex++,
      key: pageIndex
    });
  });
  const { setNumbersOfPages } = useContext(WizardContext);
  let numbersOfPages = 0;
  children.forEach(child => {
    child.type.name === "Step" && numbersOfPages++;
  });
  useEffect(() => {
    setNumbersOfPages(numbersOfPages);
  }, []);
  return children;
};

export default PageWrapper;
