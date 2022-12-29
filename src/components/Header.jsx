import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "./UI/ThemeToggler";
import ThemeContext from "../context/theme-context";
import classes from "./Header.module.scss";

function Header() {
  const themeCtx = useContext(ThemeContext);
  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  return (
    <header className={theme}>
      <Link to="/" className={classes.link} style={{ textDecoration: "none" }}>
        Where in the world?
      </Link>
      <ThemeToggler />
    </header>
  );
}

export default Header;
