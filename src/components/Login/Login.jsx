import React from 'react'
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, updateToken] = useToken();

  const navigate = useNavigate();
  function doLogin() {
    const redirect = import.meta.env.VITE_APP_URL;
    const authURL = import.meta.env.VITE_AUTH_URL;
    const baseURL = `${authURL}?redirect_url=${redirect}`;
    location.href = baseURL;
  }

  function doLogout() {
    updateToken(null);
  }

  useEffect(() => {
    //check for token in querystring
    const urlToken = searchParams.get('token');
    console.log(urlToken);
    if (urlToken) {
      updateToken(urlToken)
      setLogin(true);
      navigate('/people'); 
    }
    //check if token already exists in context
    if (token) {
      console.log(token)
      setLogin(true);
      navigate('/people'); 
    }
  }, []);

  return (
    <div>
      <button onClick={(!isLogin)?doLogin:doLogout}>{(!isLogin)?'Login':'Logout'}</button>
    </div>
  )
}

export default Login