import React, { useEffect, useState } from "react";

const CountryContext = React.createContext({
  countries: [],
  loading: false,
  filterByName: () => {},
  filterByRegion: () => {},
});

export function CountryContextProvider({ children }) {
  const [countries, setCountries] = useState([]);
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
    <CountryContext.Provider value={{ countries, loading, filterByRegion }}>
      {children}
    </CountryContext.Provider>
  );
}

export default CountryContext;
