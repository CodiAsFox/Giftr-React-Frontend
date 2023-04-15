import { useContext, createContext } from 'react';
import useSessionStorage from '../hooks/UseSessionStorage';

const TokenContext = createContext();

function TokenProvider(props) {
  const tokenKey = import.meta.env.VITE_TOKEN_KEY;
  const [token, setToken] = useSessionStorage(tokenKey, null);

  function updateToken( sessionToken ) {
    if (sessionToken) { 
      setToken(sessionToken);
    } else {
      setToken(null);
    }
  }

  return <TokenContext.Provider value={[token, updateToken]} {...props} />;
}

function useToken() {
  const context = useContext(TokenContext);
  if (!context) throw new Error('No Token Context');
  return context;
}

export { TokenProvider, useToken };