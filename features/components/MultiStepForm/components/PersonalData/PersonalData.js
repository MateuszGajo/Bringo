import React, { useState } from "react";
import cx from "classnames";
const UserInfo = ({ setUserInfo, userInfo, registerErrors}) => {
  const { firstNameError, lastNameError, phoneNumberError, connectionError } = registerErrors;
  const [inputs, setInputs] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phoneNumber: userInfo.phoneNumber
  });
  const handleInputChange = e => {
    setUserInfo({ ...inputs, [e.target.name]: e.target.value });
    setInputs({ ...inputs, [e.target.name]: e.target.value  })
  };
  return (
    <>
      <div className="field">
        <label className="label">Imię</label>
        <input
          className={cx("input", {
            "is-danger": firstNameError
          })}
          type="text"
          placeholder="Imię"
          name="firstName"
          onChange={handleInputChange}
          value={inputs.firstName}
        />
        <p className="help is-danger-message">{firstNameError && firstNameError}</p>
      </div>
      <div className="field">
        <label className="label">Nazwisko</label>
        <input
          className={cx("input", {
            "is-danger": lastNameError
          })}
          type="text"
          placeholder="Nazwisko"
          name="lastName"
          onChange={handleInputChange}
          value={inputs.lastName}
        />
        <p className="help is-danger-message">{lastNameError && lastNameError}</p>
      </div>
      <div className="field">
        <label className="label">Numer Telefonu</label>
        <input
          className={cx("input", {
            "is-danger": phoneNumberError
          })}
          type="number"
          placeholder="Numer telefonu"
          name="phoneNumber"
          onChange={handleInputChange}
          value={inputs.phoneNumber}
        />
        <p className="help is-danger-message">{phoneNumberError && phoneNumberError}</p>
      </div>
      <p className="help is-danger-message">{connectionError && connectionError}</p>
    </>
  );
};

export default UserInfo;
