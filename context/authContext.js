import React from "react";
export default React.createContext({
  user: "",
  errors: {
    authError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: ""
  },
  registerCreds: false,
  registerPersonalData: false,
  setUser: () => {},
  dispatch: () => {}
});
