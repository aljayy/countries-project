import React from "react";
import Country from "./Country";
import classes from "./CountriesWrapper.module.scss";

function CountriesWrapper() {
  return (
    <div className={classes.wrapper}>
      <Country />
    </div>
  );
}

export default CountriesWrapper;
