import React, { useContext, useState } from "react";
import CountryContext from "../../context/countries-context";
import ThemeContext from "../../context/theme-context";
import light from "../../assets/lightdropdown.svg";
import dark from "../../assets/darkdropdown.svg";
import classes from "./RegionFilter.module.scss";

function RegionFilter() {
  const [region, setRegion] = useState("Filter by Region");
  const [showDropdown, setShowDropdown] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { filterByRegion } = useContext(CountryContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;
  const dropdownClasses = showDropdown === false ? "" : classes.show;
  const arrow = theme === "light" ? light : dark;

  function renderDropdown() {
    setShowDropdown(true);
  }

  function hideDropdown() {
    setShowDropdown(false);
  }

  function selectedRegionHandler(country) {
    setRegion(country);
    filterByRegion(country.toLowerCase());
  }

  return (
    <div className={`${classes.dropdown} ${themeClasses}`}>
      <button
        className={`${classes.menu} `}
        onMouseEnter={renderDropdown}
        onClick={renderDropdown}
      >
        {region}
        <div>
          <img src={arrow} alt="Dropdown Menu Arrow" />
        </div>
      </button>
      <div
        className={`${classes["dropdown-options"]} ${dropdownClasses}`}
        onClick={hideDropdown}
        onMouseLeave={hideDropdown}
      >
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
