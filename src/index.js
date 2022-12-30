import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ThemeContextProvider } from "./context/theme-context";
import { CountryContextProvider } from "./context/countries-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeContextProvider>
        <CountryContextProvider>
          <App />
        </CountryContextProvider>
      </ThemeContextProvider>
    </HashRouter>
  </React.StrictMode>
);
