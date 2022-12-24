import React from "react";
import RegionFilter from "./RegionFilter";
import SearchCountry from "./SearchCountry";

function CountryFilters() {
  return (
    <div>
      <SearchCountry />
      <RegionFilter />
    </div>
  );
}

export default CountryFilters;
