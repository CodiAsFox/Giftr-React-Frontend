import { useContext, createContext, useState, useEffect } from 'react';

const TokenContext = createContext();

function TokenProvider(props) {
  const [token, setToken] = useState(null);
  const tokenKey = import.meta.env.VITE_TOKEN_KEY;

  useEffect(() => {
    //TODO: actually add the sessionStorage code
    //check in sessionStorage
    //for an existing value
    //handle removeItem if token is null
    // get code from context assignment
  }, [token]);

  return <TokenContext.Provider value={[token, setToken]} {...props} />;
}

function useToken() {
  const context = useContext(TokenContext);
  if (!context) throw new Error('No Token Context');
  return context;
}

export { TokenProvider, useToken };