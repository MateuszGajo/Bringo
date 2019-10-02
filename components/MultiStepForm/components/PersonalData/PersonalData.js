import React,{useState,useEffect} from "react";
import cx from 'classnames'
const UserInfo = ({setUserInfo,userInfo,validation,errors:{firstName="",lastName="",phoneNumber=""}}) => {
  const [inputs,setInputs]= useState({
    firstName:userInfo.firstName,
    lastName:userInfo.lastName,
    phoneNumber:userInfo.phoneNumber
  })
  const handleInputChange = (e)=>{
    validation(e)
    setUserInfo({...inputs,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    setInputs({...userInfo})
  },[userInfo])
  return (
    <>
      <div className="field">
        <label className="label">Imię</label>
        <input className={cx('input',{
          'is-danger':firstName.length 
        })} type="text" placeholder="Imię" name="firstName" onChange={handleInputChange} value={inputs.firstName} />
        <p className="help is-danger">{ firstName ? firstName: null}</p>
      </div>
      <div className="field">
        <label className="label">Nazwisko</label>
          <input className={cx('input',{
          'is-danger':lastName.length 
        })} type="text" placeholder="Nazwisko" name="lastName" onChange={handleInputChange} value={inputs.lastName}  />
          <p className="help is-danger">{ lastName ? lastName: null}</p>
      </div>
      <div className="field">
        <label className="label">Numer Telefonu</label>
          <input className={cx('input',{
          'is-danger':phoneNumber.length 
        })} type="text" placeholder="Numer telefonu" name="phoneNumber" onChange={handleInputChange} value={inputs.phoneNumber} />
          <p className="help is-danger">{ phoneNumber ? phoneNumber: null}</p>
      </div>
    </>
  );
};

export default UserInfo;
