import { useContext, createContext, useState, useEffect } from 'react';
import useSessionStorage from '../hooks/UseSessionStorage';

const TokenContext = createContext();

function TokenProvider(props) {
  const tokenKey = import.meta.env.VITE_TOKEN_KEY;
  const [token, setToken] = useSessionStorage(tokenKey, null);

  useEffect(() => {
    //TODO: actually add the sessionStorage code
    useSessionStorage(tokenKey, token);
    //check in sessionStorage
    //for an existing value
    //handle removeItem if token is null
    // get code from context assignment
  }, [token, tokenKey]);

  return <TokenContext.Provider value={[token, useToken]} {...props} />;
}

function useToken() {
  const context = useContext(TokenContext);
  if (!context) throw new Error('No Token Context');
  return context;
}

export { TokenProvider, useToken };