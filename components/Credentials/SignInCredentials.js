import React, { useState,useEffect } from "react";
import { MdEmail,MdLock } from "react-icons/md";
const SignIn = ({  creds,setCreds }) => {
 const [inputs,setInputs] = useState({
   email:creds.email,
  password:creds.password})
  const handleInputChange =(e)=>{
    setCreds({...inputs,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    setInputs({...creds})
  },[creds])
  return (
    <>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left ">
          <input
            className="input is-success"
            type="text"
            placeholder="E-mail"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
          />
          <span className="icon is-small is-left">
          <MdEmail />
          </span>
        </div>
        <p className="help is-success">This username is available</p>
      </div>
      <div className="field">
        <label className="label">Hasło</label>
        <div className="control has-icons-left">
          <input
            className="input is-danger"
            type="password"
            placeholder="Hasło"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <span className="icon is-small is-left">
            <MdLock/>
          </span>
        </div>
        <p className="help is-danger">This email is invalid</p>
      </div>
     
    </>
  );
};

export default SignIn;
