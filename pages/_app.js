import React, { useReducer, useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import Router from "next/router";
import jwt_deocde from "jwt-decode";
import cookies from "next-cookies";
import { verifyLogging, verifyRegistering } from "../helper";
import AuthContext from "../features/context/authContext";
import authReducer from "../features/context/authReducers";
import { RegisterFormValidation } from "../features/components/Validation/Validation";
import { initState } from "../features/context/initState";
import withApollo from "../features/lib/apollo";
import { ADD_USER } from "../features/mutations/userMutation";
import LOGIN_QUERY from "../features/queries/loginQuery";

const MyApp = ({ Component, pageProps, apollo, userInfo }) => {
  const [state, dispatch] = useReducer(authReducer, initState);

  const signIn = creds => {
    const { email, password } = creds;

    apollo
      .mutate({ mutation: LOGIN_QUERY, variables: { email, password } })
      .then(({ data }) => {
        verifyLogging(data, dispatch, setCookie);
      })
      .catch(err => {
        dispatch({
          type: "LOGIN_CONNECTION_ERROR",
          msg: "Błąd łączenia z baza danych"
        });
      });
  };

  const register = registerValues => {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    } = registerValues;

    if (RegisterFormValidation({ ...registerValues, dispatch })) {
      apollo
        .mutate({
          mutation: ADD_USER,
          variables: {
            email,
            password,
            firstName,
            lastName,
            phoneNumber: Number(phoneNumber)
          }
        })
        .then(({ data }) => {
          verifyRegistering(data, dispatch, setCookie);
        })
        .catch(err => {
          dispatch({
            type: "REGISTER_CONNECTION_ERROR",
            msg: "Błąd łączenia z baza danych"
          });
        });
    }
  };

  const setCookie = (name, value) => {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    const data = new Date();
    data.setTime(data.getTime() + 12 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${data}`;
  };

  const deleteCookie = name => {
    const data = new Date();
    data.setTime(data.getMonth() - 1);
    name = encodeURIComponent(name);
    document.cookie = name + "=; expires=" + data.toGMTString();
    Router.push("/signin");
  };

  return (
    <ApolloProvider client={apollo}>
      <AuthContext.Provider
        value={{
          ...state,
          register,
          signIn,
          setCookie,
          deleteCookie,
          userInfo
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { token } = cookies(ctx);
  const userInfo = token ? jwt_deocde(token) : null;

  return {
    pageProps: Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {},
    userInfo
  };
};

export default withApollo(MyApp);
