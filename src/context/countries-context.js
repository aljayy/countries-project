import React, { useCallback, useEffect, useState } from "react";

const CountryContext = React.createContext({
  countries: [],
  loading: false,
  setCountryName: () => {},
  filterByName: () => {},
  filterByRegion: () => {},
});

export function CountryContextProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState(null);
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

  return (
    <CountryContext.Provider
      value={{
        countries,
        loading,
        filterByRegion,
        filterByName,
        setCountryName,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export default CountryContext;
