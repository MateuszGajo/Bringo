import React, { useState, useContext } from "react";
import Link from "next/link";
import AuthPage from "../features/components/Layout/AuthPage";
import SignInCredentials from "../features/components/Credentials/SignInCredentials";
import AuthContext from "../features/context/authContext";
import { isLogged } from "../helper";
import "bulma";
import "./styles/reset.scss";
import "./styles/customize.scss";

const SignIn = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const { signIn, loginErrors } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    signIn(creds);
  };

  return (
    <AuthPage>
      <form onSubmit={handleSubmit}>
        <SignInCredentials
          componentName="signin"
          setCreds={setCreds}
          creds={creds}
          loginErrors={loginErrors}
        />
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

SignIn.getInitialProps = async ctx => {
  await isLogged(ctx, "/");
  return {};
};

export default SignIn;
