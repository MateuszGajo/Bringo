import React, { useEffect, useReducer } from "react";
import Router from "next/router";
import AuthContext from "../context/authContext";
import authReducer from "../context/authReducers";
import { RegisterFormValidation, LoginValidation } from '../components/Validation/Validation';
import { initState } from '../context/initState';


const MyApp = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const signIn = (creds) => {
    LoginValidation({ ...creds, dispatch }) && console.log('zalogowany')
  };
  const register = (registerValues) => {
    RegisterFormValidation({ ...registerValues, dispatch }) && console.log('zarejstrowany')
  };
  useEffect(() => {
    if (state.user) {
      Router.push("/");
    } else {
      Router.push("/signin");
    }
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        signIn
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default MyApp;
