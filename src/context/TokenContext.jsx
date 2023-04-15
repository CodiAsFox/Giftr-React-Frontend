import { useContext, createContext, useState, useEffect } from 'react';

const TokenContext = createContext();

function TokenProvider(props) {
  const [token, setToken] = useState(null);
  const tokenKey = VITE_TOKEN_KEY;
}