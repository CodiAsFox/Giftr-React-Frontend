import { createContext, useState, useContext } from "react";
import { UseLocalStorage } from "../hooks/UseLocalStorage";

const GiftrContext = createContext();

function GiftrProvider(props) {
  const [giftr, setGiftr] = UseLocalStorage('GiftrData', []);

  const updateGiftr = (data) => {
    setGiftr(data);
  }

  return <GiftrContext.Provider value={[giftr, updateGiftr]} {...props}/>
}

function useGiftr() {
  const context = useContext(GiftrContext);
  if (!context) throw new Error('Not inside the Provider');
  return context; // [username, setUsername]
}

export {
  GiftrProvider,
  useGiftr,
}