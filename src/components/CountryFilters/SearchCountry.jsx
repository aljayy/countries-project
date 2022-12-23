import React, { useContext } from "react";
import ThemeContext from "../../context/theme-context";
import lightmodesearch from "../../assets/lightmodesearch.svg";
import darkmodesearch from "../../assets/darkmodesearch.svg";
import classes from "./SearchCountry.module.scss";

function SearchCountry() {
  const { theme } = useContext(ThemeContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;
  const searchIcon = theme === "light" ? lightmodesearch : darkmodesearch;

  return (
    <div className={`${classes["input-wrapper"]} ${themeClasses}`}>
      <div className={classes["search-icon"]}>
        <img src={searchIcon} alt="Search Icon" />
      </div>
      <input placeholder="Search for a country..." />
    </div>
  );
}

export default SearchCountry;
