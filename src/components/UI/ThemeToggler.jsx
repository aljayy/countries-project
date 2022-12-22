import React, { useContext } from "react";
import ThemeContext from "../../context/theme-context";
import darkIcon from "../../assets/darkmode.svg";
import lightIcon from "../../assets/lightmode.svg";
import classes from "./ThemeToggler.module.scss";

function ThemeToggler() {
  const themeCtx = useContext(ThemeContext);
  const themeText = themeCtx.theme === "light" ? "Dark Theme" : "Light Theme";
  const icon = themeCtx.theme === "light" ? darkIcon : lightIcon;

  return (
    <button className={classes["mode-toggler"]} onClick={themeCtx.toggleTheme}>
      <div className={classes.icon}>
        <img src={icon} alt="Current Theme Icon" />
      </div>
      <p>{themeText}</p>
    </button>
  );
}

export default ThemeToggler;
