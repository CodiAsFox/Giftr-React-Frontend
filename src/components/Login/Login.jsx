import React from 'react'

const Login = () => {
  function doLogin() {
    const redirect = import.meta.env.VITE_APP_URL;
    const authURL = import.meta.env.VITE_AUTH_URL;
    const baseURL = `${authURL}?redirect_url=${redirect}`;
    location.href = baseURL;
  }

  return (
    <div>
      <button onClick={doLogin}>Login</button>
    </div>
  )
}

export default Login