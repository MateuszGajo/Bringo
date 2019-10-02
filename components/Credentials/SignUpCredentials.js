import React, { useState,useEffect,useRef } from "react";
import { MdEmail,MdLock } from "react-icons/md";
import cx from 'classnames'
const SignIn = ({creds,setCreds,validation,errors:{password="",confirmPassword="",email=""}}) => {
    const [inputs, setInputs] = useState({
        email:  creds.email,
        password: creds.password,
        confirmPassword: creds.confirmPassword
      });
      const handleInputChange = (e)=>{
        validation(e)
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
            className={cx('input',{
                'is-danger':email.length 
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
        <p className="help is-danger">{ email? email: null}</p>
      </div>
      <div className="field">
        <label className="label">Hasło</label>
        <div className="control has-icons-left">
          <input
            className={cx('input',{
                'is-danger':password.length 
              })}
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
        <p className="help is-danger">{ password? password: null}</p>
      </div>
        <div className="field">
        <label className="label">Powtórz hasło</label>
        <div className="control has-icons-left">
          <input
            className={cx('input',{
              'is-danger':confirmPassword.length 
            })}
            type="password"
            placeholder="Powtórz hasło"
            name="confirmPassword"
            onChange={handleInputChange}
            value={inputs.confirmPassword}
          />
          <span className="icon is-small is-left">
          <MdLock/>
          </span>
        </div>
        <p className="help is-danger">{ confirmPassword? confirmPassword: null}</p>
      </div>
        
    </>
  );
};

export default SignIn;
