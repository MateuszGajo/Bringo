import React, { useState, useEffect } from "react";
import cx from "classnames";
const UserInfo = ({ setUserInfo, userInfo, errors }) => {
  const { firstNameError, lastNameError, phoneNumberError } = errors;
  const [inputs, setInputs] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phoneNumber: userInfo.phoneNumber
  });
  const handleInputChange = e => {
    setUserInfo({ ...inputs, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setInputs({ ...userInfo });
  }, [userInfo]);
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
        <p className="help is-danger">{firstNameError && firstNameError}</p>
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
        <p className="help is-danger">{lastNameError && lastNameError}</p>
      </div>
      <div className="field">
        <label className="label">Numer Telefonu</label>
        <input
          className={cx("input", {
            "is-danger": phoneNumberError
          })}
          type="text"
          placeholder="Numer telefonu"
          name="phoneNumber"
          onChange={handleInputChange}
          value={inputs.phoneNumber}
        />
        <p className="help is-danger">{phoneNumberError && phoneNumberError}</p>
      </div>
    </>
  );
};

export default UserInfo;
