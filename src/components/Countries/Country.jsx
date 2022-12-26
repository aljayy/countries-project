import React, { useContext, useEffect, useState } from "react";
import Loader from "../UI/Loader";
import ThemeContext from "../../context/theme-context";
import classes from "./Country.module.scss";

function Country() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;

  useEffect(() => {
    sendRequest();
  }, []);

  async function sendRequest() {
    setLoading(true);
    const response = await fetch("https://restcountries.com/v3.1/all");

    const data = await response.json();

    const countries = data.map((country) => {
      return {
        flag: country.flags.svg,
        name: country.name.official,
        population: country.population.toLocaleString(),
        region: country.region,
        capital: country.capital,
      };
    });

    setCountries(countries);
    setLoading(false);
  }

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
