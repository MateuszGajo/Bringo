import React, { useState, usecontext, useContext } from "react";
import Link from "next/link";
import Validate from 'react-validate-form'
import * as MultiStep from "../components/MultiStepForm/MultiStepForm";
import HomePage from "../components/Layout/HomePage";
import authContext from "../context/authContext";
import "bulma";
import "./index.scss";
import './reset.scss'

const SignUp = () => {
  const {validations,messages,register} = useContext(authContext);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [userInfo,setUserInfo] = useState({
    firstName:"",
    lastName:"",
    phoneNumber:""
  })
  const isFilledInputs = Object.values({...creds,...userInfo}).every((value)=>value !== "");
  const handleSubmit = e => {
    e.preventDefault();
    register();
  };
  return (
    <HomePage> 
       <Validate
        validations={validations}
        rules={messages}
        >{({ validate, errorMessages,allValid }) => (
      <MultiStep.Wizard >
        <form onSubmit={handleSubmit}>
          <MultiStep.StepWrapper>
            <MultiStep.Step >
              <MultiStep.SignUpCredentials  validation={validate} errors={errorMessages} creds={creds} setCreds={setCreds} />
            </MultiStep.Step>
            <MultiStep.Step >
              <MultiStep.PersonalData validation={validate} errors={errorMessages} setUserInfo={setUserInfo} userInfo={userInfo}/>
            </MultiStep.Step>
          </MultiStep.StepWrapper>
          <MultiStep.Controls isValidate={allValid&& isFilledInputs }/>
          </form>
      </MultiStep.Wizard>
      )}
       </Validate>
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

 
