import React, { useContext } from "react";
import ThemeContext from "../../context/theme-context";
import classes from "./Loader.module.scss";

function Loader() {
  const { theme } = useContext(ThemeContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;

  return <div className={`${classes.loader} ${themeClasses}`}></div>;
}

export default Loader;
