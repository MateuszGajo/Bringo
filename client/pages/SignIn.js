import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Axios from "axios";
import cookies from 'next-cookies';
import AuthPage from "../features/components/Layout/AuthPage";
import SignInCredentials from "../features/components/Credentials/SignInCredentials";
import AuthContext from "../features/context/authContext";
import {SERVER_URL} from '../configs';
import "bulma";
import "./index.scss";
import './reset.scss'


const SignIn = () => {

  const [creds, setCreds] = useState({ email: "", password: "" });
  const { signIn } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    signIn(creds);

  };

  return (
    <AuthPage>
      <form onSubmit={handleSubmit}>
        <SignInCredentials componentName="signin" setCreds={setCreds} creds={creds} />
        <button className="button">Zaloguj się</button>
      </form>
      <p>
        Nie masz jeszcze konta?
        <Link href="/signup">
          <a> Zarejstruj się</a>
        </Link>
      </p>
    </AuthPage>
  );
};


SignIn.getInitialProps = async (ctx) => {
  const {res} = ctx;
  const {token} = cookies(ctx);
  const checkToken  = await Axios.get(SERVER_URL +"/auth/me",{headers: {
    'Authorization':token||"",
    'Content-Type': 'application/x-www-form-urlencoded'
}})

if(res && checkToken.data.success){
    res.writeHead(302, {
      Location: '/'
    })
    res.end()
  }
  else if (checkToken.data.success){
    Router.push('/')
  }
return {}
}

export default SignIn;
