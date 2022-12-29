import React, { useEffect, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./CountryDetails.module.scss";
import lightarrow from "../../assets/lightbackarrow.svg";

function CountryDetails() {
  const [countryDetails, setCountryDetails] = useState([]);
  const { id } = useParams();

  const retrieveCountryDetails = useCallback(async () => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);

    const data = await response.json();

    let countryData = data.map((country) => {
      return {
        borderCountries: country.borders,
        capital: country.capital,
        currency: Object.values(country.currencies)[0].name,
        flag: country.flags.svg,
        languages: Object.values(country.languages),
        name: country.name.common,
        native: Object.values(country.name.nativeName).pop().common,
        population: country.population.toLocaleString(),
        region: country.region,
        subregion: country.subregion,
        tld: country.tld,
      };
    });

    let borderCountries = "";
    for (let i = 0; i < countryData[0].borderCountries.length; i++) {
      if (i === 0) {
        borderCountries += countryData[0].borderCountries[i];
      } else {
        borderCountries += "," + countryData[0].borderCountries[i];
      }
    }

    const borderResponse = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${borderCountries}`
    );

    const borderData = await borderResponse.json();

    countryData[0].borderCountries = borderData.map((country) => {
      return { name: country.name.common, id: country.ccn3 };
    });

    setCountryDetails(countryData);
  }, [id]);

  useEffect(() => {
    retrieveCountryDetails();
  }, [retrieveCountryDetails]);

  return (
    <>
      {countryDetails.length === 0 && <p>Loading...</p>}
      {countryDetails.length > 0 && (
        <div className={classes["country-details-wrapper"]}>
          <Link className={classes.back} style={{ textDecoration: "none" }}>
            <div className={classes["icon-wrapper"]}>
              <img src={lightarrow} alt="Arrow Icon" />
            </div>
            <span>Back</span>
          </Link>
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
          </div>
        </div>
      )}
    </>
  );
}

export default CountryDetails;
