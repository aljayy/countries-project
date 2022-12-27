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

  async function retrieveAllCountries() {
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

  const filterByName = useCallback(async () => {
    setLoading(true);
    console.log("filterByName");
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    console.log(response);

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
  }, [countryName]);

  useEffect(() => {
    if (countryName !== null) {
      const timer = setTimeout(() => {
        console.log("use effect ran");
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
