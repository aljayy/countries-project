import React from "react";

import classes from "./Header.module.scss";
import darkmode from "../assets/darkmode.svg";

function Header() {
  return (
    <header>
      <h1>Where in the world?</h1>
      <div className={classes["mode-toggler"]}>
        <div className={classes.icon}>
          <img src={darkmode} alt="Dark Mode Toggle" />
        </div>
        <p>Dark Mode</p>
      </div>
    </header>
  );
}

export default Header;
