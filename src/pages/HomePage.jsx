import React from "react";
import CountriesWrapper from "../components/Countries/CountriesWrapper";
import CountryFilters from "../components/CountryFilters/CountryFilters";

function HomePage() {
  return (
    <>
      <CountryFilters />
      <CountriesWrapper />
    </>
  );
}

export default HomePage;
