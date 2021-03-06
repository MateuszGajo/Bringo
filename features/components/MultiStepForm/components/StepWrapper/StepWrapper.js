import React, { useContext, useEffect } from "react";
import { WizardContext } from "../../context/WizardContext";

const PageWrapper = ({ children }) => {
  const { setNumbersOfPages } = useContext(WizardContext);
  let numbersOfPages = 0;
  let pageIndex = 1;

  children = children.map(child => {
    return React.cloneElement(child, {
      pageIndex: pageIndex++,
      key: pageIndex
    });
  });

  
  children.forEach(child => {
    console.log(child)
    child.props.dataStep === "step" && numbersOfPages++;
  });

  useEffect(() => {
    console.log(numbersOfPages)
    setNumbersOfPages(numbersOfPages);
  }, []);

  return children;
};

export default PageWrapper;
