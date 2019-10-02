import React, { useState, useEffect, useReducer } from "react";
import Router from "next/router";
import AuthContext from "../context/authContext";
import authReducer from "../context/authReducers";

const initState = {
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
};

const MyApp = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const [password,setPassword]= useState('');
  const signIn = ({ email, password }) => {
    console.log(email,password);
    if (true) {
      dispatch({ type: "SIGNIN_SUCCESS", token: "token" });
    } else if (false) {
      dispatch({ type: "SIGNIN_ERROR", msg: "Niepoprawny e-mail badź hasło" });
    }
  };
  const validations = {
    firstName: ["required"],
    lastName:["required"],
    phoneNumber:["numberRule"],
    email: ["email"],
    confirmPassword:['confirmPassword'],
    password: ["password"],
   }

   const messages= {
    required: {
      message: () => "Uzupełnij to pole",
    },
    email:{
      message:()=>"e-mail jest nie poprawny"
    },
    numberRule: {
      test:(number)=>number.length === 9 && !isNaN(number),
      message: () => `Numer telefonu powinień
       składać się z 9 cyfr`,
    },
    password:{
      test:(pass)=>{
        setPassword(pass)
        return pass.length>=6},
      message:()=>"Hasło musi zawierać conajmniej 6 znaków"
    },
    confirmPassword:{
      test:(confirmPass)=> confirmPass === password,
      message:()=>"Podane hasła są różne"
    }
   };
   const register = ()=> dispatch({type:"SIGNUP_SUCCESS"})
  

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
        validations,
        messages,
        register,
        signIn
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default MyApp;
