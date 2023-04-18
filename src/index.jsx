import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import { TokenProvider } from "./context/TokenContext";
import { GiftrProvider } from "./context/GiftrContext";
import theme from "./theme/theme";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      {localStorage.setItem(
        "chakra-ui-color-mode",
        theme.config.initialColorMode
      )}
      <TokenProvider>
        <GiftrProvider>
          <BrowserRouter>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </BrowserRouter>
        </GiftrProvider>
      </TokenProvider>
    </ChakraProvider>
  </React.StrictMode>
);
