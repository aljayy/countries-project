import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader";
import ThemeContext from "../../context/theme-context";
import classes from "./Country.module.scss";
import CountryContext from "../../context/countries-context";

function Country() {
  const { theme } = useContext(ThemeContext);
  const { retrieveAllCountries, countries, loading } =
    useContext(CountryContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;

  useEffect(() => {
    retrieveAllCountries();
  }, [retrieveAllCountries]);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        countries.map((country) => {
          return (
            <Link
              to={`/country/${country.id}`}
              style={{ textDecoration: "none" }}
            >
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
            </Link>
          );
        })}
    </>
  );
}

export default Country;
