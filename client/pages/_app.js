import React, { useReducer } from "react";
import { ApolloProvider } from '@apollo/react-hooks';
import Router from 'next/router';
import AuthContext from "../features/context/authContext";
import authReducer from "../features/context/authReducers";
import { RegisterFormValidation } from '../features/components/Validation/Validation';
import { initState } from '../features/context/initState';
import withApollo from '../features/lib/apollo';
import ADD_USER from '../features/mutations/userMutation';
import LOGIN_QUERY from '../features/queries/loginQuery';

const MyApp = ({ Component, pageProps, apollo }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  
  const signIn = (creds) => {
      const {email,password} = creds;
      apollo.mutate({ mutation: LOGIN_QUERY, variables: { email, password } })
      .then(resp=>{
        setCookie('token',resp.data.login.token);
        Router.push('/')
      })
      .catch(err=>{
        dispatch({ type: "LOGIN_ERROR", msg: "Błąd łączenia z baza danych" });
      })
    
  };

  const register = (registerValues) => {
    const { email, password, firstName, lastName, phoneNumber } = registerValues;

    if (RegisterFormValidation({ ...registerValues, dispatch })) {
      apollo.mutate({ mutation: ADD_USER, variables: { email, password, firstName, lastName, phoneNumber: Number(phoneNumber) } })
      .then(resp => {
        setCookie('token',resp.data.createUser.token);
        Router.push('/')})
      .catch(err => {
        console.log('blad rejstracji')
        dispatch({ type: "REGISTER_ERROR", msg: "Błąd łączenia z baza danych" });
      })
    }
  };

  const setCookie = (name,value)=>{
    const data = new Date();
          data.setTime(data.getTime() + 12*60*60*1000);
          document.cookie=`${name}=${value}; expires=${data}`;
  }

  const deleteCookie=(name)=> {
    const data = new Date();
    data.setTime(data.getMonth()-1);
     name = encodeURIComponent(name);
    document.cookie = name + "=; expires=" + data.toGMTString();
    Router.push('/signin')
}

  return (
    <ApolloProvider client={apollo}>
      <AuthContext.Provider
        value={{
          ...state,
          register,
          signIn,
          deleteCookie
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
  return {
    pageProps: Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
  };
};

export default withApollo(MyApp)
