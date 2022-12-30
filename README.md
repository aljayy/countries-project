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

- Using the useContext hook to manage appwide state for the countries data and theme toggler functionality: [Example code for countries context](https://github.com/aljayy/countries-project/blob/main/src/context/countries-context.js) and the [example for the theme toggling context](https://github.com/aljayy/countries-project/blob/main/src/context/theme-context.js).

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

- Implementation of React Router: [Example code](https://github.com/aljayy/countries-project/blob/main/src/App.js)

- Usage of SCSS custome properties: [Example code](https://github.com/aljayy/countries-project/blob/main/src/_variables.module.scss)

### Why I built the project this way

- Although this application is on the smaller side, I wanted to keep practicing on managing state at a global scope. This really shined when I used React Context to manage the state for toggling the theme since every components styling had to change.
- Using SCSS modules stylesheet is a great way to scope locally by default.
- I wanted to try and style the dropdown as it was shown in the design files but that required a work around since the <select> element wouldn't allow such stylings. While it worked, I'd probably use Material UI next time to achieve this.
- I had a couple of options in order to implement the search functionality.

  - Send a request when the user clicked the "enter" key.
  - Implement debouncing and only send a request when the timer has expired.
  - Send a request on every onChange event in the input.

- The first option would be a good implementation but the design files don't show a submit/enter button on the input field so it's not a step that would be very apparent to the user. Option 3 was more of a last resort, sending a request on every onChange event would be much too expensive in terms of server and performance costs. I ended up choosing option 2 because there's nothing the user needs to do in order to send a request while limiting the rate at which I'm sending requests to the server. [Here's how I implemented that](https://github.com/aljayy/countries-project/blob/main/src/context/countries-context.js#L63-L87).
