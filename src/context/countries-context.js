import React, { useCallback, useEffect, useState } from "react";

const CountryContext = React.createContext({
  countries: [],
  countryDetails: [],
  loading: false,
  setCountryName: () => {},
  filterByName: () => {},
  filterByRegion: () => {},
});

export function CountryContextProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState(null);
  const [countryDetails, setCountryDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveAllCountries();
  }, []);

  function transformData(data) {
    return data.map((country) => {
      return {
        flag: country.flags.svg,
        name: country.name.official,
        population: country.population.toLocaleString(),
        region: country.region,
        capital: country.capital,
        id: country.ccn3,
      };
    });
  }

  async function retrieveAllCountries() {
    setLoading(true);

    const response = await fetch("https://restcountries.com/v3.1/all");

    const data = await response.json();

    const countries = transformData(data);

    setCountries(countries);
    setLoading(false);
  }

  const filterByName = useCallback(async () => {
    setLoading(true);

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    const data = await response.json();

    const countries = transformData(data);

    setCountries(countries);
    setLoading(false);
  }, [countryName]);

  useEffect(() => {
    if (countryName !== null && countryName !== "") {
      const timer = setTimeout(() => {
        filterByName();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [countryName, filterByName]);

  async function filterByRegion(region) {
    setLoading(true);
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );

    const data = await response.json();

    const countries = transformData(data);

    setCountries(countries);
    setLoading(false);
  }

  const retrieveCountryDetails = useCallback(async (id) => {
    setLoading(true);
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);

    const data = await response.json();

    let countryData = data.map((country) => {
      return {
        borderCountries: country.borders ? country.borders : [],
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

    if (countryData[0].borderCountries.length < 1) {
      setCountryDetails(countryData);
      setLoading(false);
      return;
    }

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
    setLoading(false);
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countries,
        countryDetails,
        loading,
        filterByRegion,
        filterByName,
        setCountryName,
        retrieveCountryDetails,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export default CountryContext;
