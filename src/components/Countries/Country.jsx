import React, { useContext } from "react";
import Loader from "../UI/Loader";
import ThemeContext from "../../context/theme-context";
import classes from "./Country.module.scss";
import CountryContext from "../../context/countries-context";

function Country() {
  const { theme } = useContext(ThemeContext);
  const { countries, loading } = useContext(CountryContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        countries.map((country) => {
          return (
            <div className={classes["country-card-wrapper"]}>
              <div className={classes.flag}>
                <img src={country.flag} alt="Country Flag" />
              </div>
              <div className={`${classes["country-info"]} ${themeClasses}`}>
                <h2>{country.name}</h2>
                <p>
                  <span>Population:</span> {country.population}
                </p>
                <p>
                  <span>Region:</span> {country.region}
                </p>
                <p>
                  <span>Capital:</span> {country.capital}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Country;
