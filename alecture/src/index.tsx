import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./assets/global";
import { ThemeProvider } from "styled-components";
import theme from "./assets/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
