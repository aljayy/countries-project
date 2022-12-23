import React, { useContext, useState } from "react";
import ThemeContext from "../../context/theme-context";
import light from "../../assets/lightdropdown.svg";
import dark from "../../assets/darkdropdown.svg";
import classes from "./RegionFilter.module.scss";

function RegionFilter() {
  const [region, setRegion] = useState("Filter by Region");
  const { theme } = useContext(ThemeContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;
  const arrow = theme === "light" ? light : dark;

  // Implementation to hide regions for drop down menu when region is selected. A bit buggy for now. Will come back to this later.

  // const hideDropdown = showRegions ? "" : classes.hide;

  // const [showRegions, setShowRegions] = useState(false);

  // function showRegionsHandler() {
  //   setShowRegions((prevState) => !prevState);
  // }

  function selectedRegionHandler(country) {
    setRegion(country);

    // showRegionsHandler();
  }
  return (
    <div className={`${classes.dropdown} ${themeClasses}`}>
      <button className={`${classes.menu} `}>
        {region}
        <div>
          <img src={arrow} alt="Dropdown Menu Arrow" />
        </div>
      </button>
      <div className={classes["dropdown-options"]}>
        <div onClick={() => selectedRegionHandler("Africa")}>Africa</div>
        <div onClick={() => selectedRegionHandler("America")}>America</div>
        <div onClick={() => selectedRegionHandler("Asia")}>Asia</div>
        <div onClick={() => selectedRegionHandler("Europe")}>Europe</div>
        <div onClick={() => selectedRegionHandler("Oceania")}>Oceania</div>
      </div>
    </div>
  );
}

export default RegionFilter;
