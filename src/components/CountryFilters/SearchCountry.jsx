import React from "react";
import lightmodesearch from "../../assets/lightmodesearch.svg";
import classes from "./SearchCountry.module.scss";

function SearchCountry() {
  return (
    <div className={classes["input-wrapper"]}>
      <div className={classes["search-icon"]}>
        <img src={lightmodesearch} alt="Search Icon" />
      </div>
      <input placeholder="Search for a country..." />
    </div>
  );
}

export default SearchCountry;
