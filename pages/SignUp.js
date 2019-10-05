import React, { useState, useContext } from "react";
import Link from "next/link";
import * as MultiStep from "../components/MultiStepForm/MultiStepForm";
import HomePage from "../components/Layout/HomePage";
import authContext from "../context/authContext";
import "bulma";
import "./index.scss";
import "./reset.scss";

const SignUp = () => {
  const { register, errors, allValid } = useContext(authContext);
  console.log(allValid);
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
    <HomePage>
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
    </HomePage>
  );
};

export default SignUp;
