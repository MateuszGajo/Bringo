import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
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
          <FontAwesomeIcon
            icon={faEnvelope}
           />
          </span>
        </div>
        <p className="help is-danger-message">{emailError && emailError}</p>
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
          <FontAwesomeIcon
            icon={faLock}
           />
          </span>
        </div>
        <p className="help is-danger-message">{passwordError && passwordError}</p>
      </div>
      <p className="help is-danger-message">{connectionError && connectionError}</p>
    </>
  );
};

export default SignIn;
