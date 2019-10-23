import React, { useState, useContext } from "react";
import Link from "next/link";
import Axios from "axios";
import cookies from 'next-cookies';
import * as MultiStep from "../features/components/MultiStepForm/MultiStepForm";
import AuthPage from "../features/components/Layout/AuthPage";
import authContext from "../features/context/authContext";
import {SERVER_URL} from '../configs';
import "bulma";
import "./index.scss";
import "./reset.scss";


const SignUp = () => {
  const { register, errors } = useContext(authContext);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    register({ ...creds, ...userInfo });
  };

  return (
    <AuthPage>
      <MultiStep.Wizard>
        <form onSubmit={handleSubmit}>
          <MultiStep.StepWrapper>
            <MultiStep.Step>
              <MultiStep.SignUpCredentials
                creds={creds}
                setCreds={setCreds}
                errors={errors}
              />
            </MultiStep.Step>
            <MultiStep.Step>
              <MultiStep.PersonalData
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                errors={errors}
              />
            </MultiStep.Step>
          </MultiStep.StepWrapper>
          <MultiStep.Controls />
        </form>
      </MultiStep.Wizard>
      <p>
        Masz już konto?
        <Link href="/signin">
          <a> Zaloguj się</a>
        </Link>
      </p>
    </AuthPage>
  );
};

SignUp.getInitialProps = async (ctx) => {
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

export default SignUp;
