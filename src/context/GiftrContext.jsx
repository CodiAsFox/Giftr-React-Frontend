import { createContext, useState, useContext } from "react";

const GiftrContext = createContext();

function GiftrProvider(props) {
  const [giftr, setGiftr] = useState(null);

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