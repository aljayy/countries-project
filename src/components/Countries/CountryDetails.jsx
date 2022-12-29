import React, { useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CountryContext from "../../context/countries-context";
import ThemeContext from "../../context/theme-context";
import Loader from "../UI/Loader";
import classes from "./CountryDetails.module.scss";
import lightarrow from "../../assets/lightbackarrow.svg";
import darkarrow from "../../assets/darkbackarrow.svg";

function CountryDetails() {
  const navigate = useNavigate();
  const { retrieveCountryDetails, loading, countryDetails } =
    useContext(CountryContext);
  const { theme } = useContext(ThemeContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;
  const { id } = useParams();
  const arrow = theme === "light" ? lightarrow : darkarrow;

  useEffect(() => {
    retrieveCountryDetails(id);
  }, [retrieveCountryDetails, id]);

  return (
    <>
      {loading && <Loader />}
      {!loading && countryDetails.length > 0 && (
        <div
          className={`${classes["country-details-wrapper"]} ${themeClasses}`}
        >
          <button
            className={classes.back}
            onClick={() => {
              navigate(-1);
            }}
          >
            <div className={classes["icon-wrapper"]}>
              <img src={arrow} alt="Arrow Icon" />
            </div>
            <span>Back</span>
          </button>
          <div className={classes["flag-wrapper"]}>
            <img src={countryDetails[0].flag} alt="Country Flag" />
          </div>
          <h2>{countryDetails[0].name}</h2>
          <div className={classes.details}>
            <p>
              <span>Native Name: </span>
              {countryDetails[0].native}
            </p>
            <p>
              <span>Population: </span>
              {countryDetails[0].population}
            </p>
            <p>
              <span>Region: </span>
              {countryDetails[0].region}
            </p>
            <p>
              <span>Subregion: </span>
              {countryDetails[0].subregion}
            </p>
            <p>
              <span>Capital: </span>
              {countryDetails[0].capital}
            </p>
            <p>
              <span>Top Level Doman: </span>
              {countryDetails[0].tld}
            </p>
            <p>
              <span>Currencies: </span>
              {countryDetails[0].currency}
            </p>
            <p>
              <span>Languages: </span>
              {countryDetails[0].languages}
            </p>
            {countryDetails[0].borderCountries.length > 0 && (
              <>
                <h3>Border Countries:</h3>
                <div className={classes.border}>
                  {countryDetails[0].borderCountries.map((border) => {
                    return (
                      <Link
                        to={`/country/${border.id}`}
                        style={{ textDecoration: "none" }}
                        preventScrollReset={false}
                        className={classes["border-country"]}
                      >
                        {border.name}
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CountryDetails;
