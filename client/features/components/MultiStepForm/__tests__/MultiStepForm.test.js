import React from "react";
import { render, fireEvent } from "@testing-library/react";
import * as MultiStepForm from "../MultiStepForm";
import { WizardContext } from '../context/WizardContext';

describe("MultiStepForm components", () => {
  it('Does form buttons  works correctly', () => {
    const mockedContext = {
      currentPage: 2,
      setCurrentPage: jest.fn(),
      numbersOfPages: 3
    }
    const { getByText } = render(
      <WizardContext.Provider value={mockedContext}>
        <MultiStepForm.Controls  />
      </WizardContext.Provider>
    )
    fireEvent.click(getByText(/Poprzednia/i));
    expect(mockedContext.setCurrentPage).toBeCalledTimes(1)
    expect(mockedContext.setCurrentPage).toBeCalledWith(1);

    fireEvent.click(getByText(/Następna/i));
    expect(mockedContext.setCurrentPage).toBeCalledTimes(2);
    expect(mockedContext.setCurrentPage).toBeCalledWith(3);

  })

})
