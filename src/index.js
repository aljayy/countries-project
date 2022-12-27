import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./context/theme-context";
import { CountryContextProvider } from "./context/countries-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <CountryContextProvider>
          <App />
        </CountryContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
