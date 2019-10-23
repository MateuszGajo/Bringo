import React from "react";
export default React.createContext({
  errors: {
    authError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    registerError:""
  }
});
