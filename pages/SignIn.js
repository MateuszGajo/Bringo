import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import HomePage from "../components/Layout/HomePage";
import SignInCredentials from "../components/Credentials/SignInCredentials";
import AuthContext from "../context/authContext";
import "bulma";
import "./index.module.scss";
import './reset.scss'

const SignIn = () => {

const [creds, setCreds] = useState({ email: "", password: "" });
const {signIn} = useContext(AuthContext);

const handleSubmit = e => {
  e.preventDefault();
 signIn(creds);

};

  return (
    <HomePage>
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
    </HomePage>
  );
};

export default SignIn;
