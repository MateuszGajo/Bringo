import React, { useState, useContext } from "react";
import Link from "next/link";
import * as MultiStep from "../features/components/MultiStepForm/MultiStepForm";
import AuthPage from "../features/components/Layout/AuthPage";
import authContext from "../features/context/authContext";
import { isLogged } from "../helper";
import "bulma";
import "./styles/reset.scss";
import "./styles/customize.scss";

const SignUp = () => {
  const { register, registerErrors } = useContext(authContext);
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
          {registerErrors.isFieldsError ? (
            <p className="help is-danger-message">Popraw zaznaczone pola</p>
          ) : null}
          <MultiStep.StepWrapper>
            <MultiStep.Step>
              <MultiStep.SignUpCredentials
                creds={creds}
                setCreds={setCreds}
                registerErrors={registerErrors}
              />
            </MultiStep.Step>
            <MultiStep.Step>
              <MultiStep.PersonalData
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                registerErrors={registerErrors}
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

SignUp.getInitialProps = async ctx => {
  await isLogged(ctx, "/");
  return {};
};

export default SignUp;
