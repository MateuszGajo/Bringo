import React from "react";
export default React.createContext({
  user: "",
  allValid: true,
  errors: {
    authError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  }
});
