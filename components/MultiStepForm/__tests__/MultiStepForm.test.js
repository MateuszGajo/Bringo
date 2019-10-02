import React from "react";
import { render } from "@testing-library/react";
import { MultiStepFormContext } from "../MultiStepFormContext";
import * as MultiStepForm from "../MultiStepForm";

describe("MultiStepForm components", () => {
  it("dispalys form buttons", () => {
    const { getByText } = render(<MultiStepForm.Controls />);
  });
});
