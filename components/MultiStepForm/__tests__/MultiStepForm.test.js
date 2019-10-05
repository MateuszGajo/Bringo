import React from "react";
import { render,fireEvent } from "@testing-library/react";
import * as MultiStepForm from "../MultiStepForm";
import {WizardContext} from '../context/WizardContext';

describe("MultiStepForm components", () => {
  it('Does previous button works corretly',()=>{
    const mockedContext = {
      currentPage:2,
      setCurrentPage:jest.fn(),
      numbersOfPages:2
    }
    const {getByText} = render(
      <WizardContext.Provider value={mockedContext}>
        <MultiStepForm.Controls isValidate={true}/>
      </WizardContext.Provider>
    )
    fireEvent.click(getByText(/Poprzednia/i));
    expect(mockedContext.setCurrentPage).toBeCalledTimes(1)
    expect(mockedContext.setCurrentPage).toBeCalledWith(1);
  })
})
