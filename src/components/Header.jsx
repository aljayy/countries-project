import React, { useContext } from "react";
import ThemeToggler from "./UI/ThemeToggler";
import ThemeContext from "../context/theme-context";
import classes from "./Header.module.scss";

function Header() {
  const themeCtx = useContext(ThemeContext);
  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  return (
    <header className={theme}>
      <h1>Where in the world?</h1>
      <ThemeToggler />
    </header>
  );
}

export default Header;
