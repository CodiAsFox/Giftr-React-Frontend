import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import { GiftrProvider } from "./context/PageContext";
import { TokenProvider } from "./context/TokenContext";

import theme from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <TokenProvider>
      <GiftrProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GiftrProvider>
    </TokenProvider>
  </ChakraProvider>
);
