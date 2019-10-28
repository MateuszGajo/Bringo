import React from "react";
export default React.createContext({
  registerErrors: {
    authError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    firstNameError: "",
    lastNameError: "",
    phoneNumberError: "",
    connectionError:""
  },
  loginErrors:{
  emailError:"",
  passwordError:"",
  connectionError:""
  }
});
