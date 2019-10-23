import React,{useContext} from "react";
import Router from 'next/router'
import Axios from "axios";
import cookies from 'next-cookies';
import {SERVER_URL} from '../configs';
import authContext from "../features/context/authContext"; 
import "bulma";
import "./index.scss";
import './reset.scss';


const Home = () => {
  const {deleteCookie} = useContext(authContext);
  return (
    <div>
      <a href="#" onClick={()=>deleteCookie('token')}>
        Wyloguj się
      </a>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const {res} = ctx;
  const {token} = cookies(ctx);
  const checkToken  = await Axios.get(SERVER_URL +"/auth/me",{headers: {
    'Authorization':token||"",
    'Content-Type': 'application/x-www-form-urlencoded'
}})

if(res && !checkToken.data.success){
    res.writeHead(302, {
      Location: '/signin'
    })
    res.end()
  }
  else if (!checkToken.data.success){
    Router.push('/signin')
  }
return {}
}


export default Home;

