# REST Countries API with color theme switcher

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

## My process

### Built with

- Semantic HTML5 markup
- Javascript
- SCSS custom properties
- [React](https://reactjs.org/) - JS library
- [React Router](https://reactrouter.com/en/main) - Routing library

### How to navigate this project

- Using the useContext hook to manage appwide state for the countries data and theme toggler functionality: [Example code for countries context](https://github.com/aljayy/countries-project/blob/main/src/context/countries-context.js) and the [example for the theme toggling context](https://github.com/aljayy/countries-project/blob/main/src/context/theme-context.js)

- Fetching data from the REST Countries API:
  - This example comes from the countries-context file when making a request for a specific country's details.

```js
const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
```

- Example of the data transformation from the response of the request above.

```js
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
```
