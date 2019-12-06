import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import cx from "classnames";
const SignIn = ({ creds, setCreds, loginErrors }) => {

  const { emailError, passwordError, connectionError } = loginErrors;
  const [inputs, setInputs] = useState({
    email: creds.email,
    password: creds.password
  });
  const handleInputChange = e => {
    setCreds({ ...inputs, [e.target.name]: e.target.value });
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left ">
          <input
            className={cx("input", {
              "is-danger": emailError
            })}
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
        <p className="help is-danger">{emailError && emailError}</p>
      </div>

      <div className="field">
        <label className="label">Hasło</label>
        <div className="control has-icons-left">
          <input
            className={cx("input", {
              "is-danger": passwordError
            })}
            type="password"
            placeholder="Hasło"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <span className="icon is-small is-left">
            <MdLock />
          </span>
        </div>
        <p className="help is-danger">{passwordError && passwordError}</p>
      </div>
      <p className="help is-danger">{connectionError && connectionError}</p>
    </>
  );
};

export default SignIn;
